import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCalendar, HiClock, HiLocationMarker, HiCheckCircle, HiArrowLeft, HiArrowRight, HiCreditCard, HiShieldCheck } from 'react-icons/hi';
import { serviceApi, bookingApi } from '@/services/api.service';
import { toast } from 'react-hot-toast';

const STEPS = ['Select Service', 'Schedule', 'Address', 'Confirm & Pay'];
const timeSlots = ['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'];

const BookingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedServiceId = searchParams.get('serviceId');

  const [step, setStep] = useState(0);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState({ line1: '', city: 'Mumbai', pincode: '400001', notes: '' });
  const [payMethod, setPayMethod] = useState('stripe');
  const [loading, setLoading] = useState(false);
  const [bookedBooking, setBookedBooking] = useState(null);

  // Fetch Services from API
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoadingServices(true);
        const res = await serviceApi.getAll({ limit: 50 });
        if (res.data?.success) {
          const list = res.data.data.services || [];
          setServices(list);
          if (preselectedServiceId) {
            const found = list.find((s) => (s._id || s.id) === preselectedServiceId);
            if (found) {
              setSelectedService(found);
              setStep(1); // Jump to schedule if service preselected
            }
          }
        }
      } catch {
        toast.error('Failed to load services');
      } finally {
        setLoadingServices(false);
      }
    };
    loadServices();
  }, [preselectedServiceId]);

  const canNext = () => {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!selectedDate && !!selectedTime;
    if (step === 2) return !!address.line1 && !!address.city && !!address.pincode;
    return true;
  };

  const handleBook = async () => {
    setLoading(true);
    try {
      const payload = {
        service: selectedService._id || selectedService.id,
        bookingDate: selectedDate,
        timeSlot: selectedTime,
        address: {
          line1: address.line1,
          city: address.city,
          pincode: address.pincode,
        },
        notes: address.notes,
      };

      const res = await bookingApi.create(payload);
      if (res.data?.success) {
        setBookedBooking(res.data.data.booking);
        toast.success('🎉 Booking confirmed! Provider notified.');
      } else {
        toast.error(res.data?.message || 'Failed to create booking');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking submission failed');
    } finally {
      setLoading(false);
    }
  };

  // Success screen
  if (bookedBooking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl border border-slate-100 shadow-xl p-10 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiCheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-display font-bold text-3xl text-slate-900 mb-2">Booking Confirmed!</h2>
          <p className="text-slate-500 mb-2">Your booking reference number is</p>
          <p className="font-mono font-bold text-primary-600 text-lg mb-6">{bookedBooking.bookingNumber || `BK-${bookedBooking._id?.substring(0, 8)}`}</p>
          <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Service</span>
              <span className="font-semibold text-slate-900">{selectedService?.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Date & Time</span>
              <span className="font-semibold text-slate-900">{selectedDate} at {selectedTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Total Amount</span>
              <span className="font-semibold text-green-700">₹{selectedService?.price?.amount}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setBookedBooking(null); setStep(0); setSelectedService(null); setSelectedDate(''); setSelectedTime(''); }} className="flex-1 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all">
              New Booking
            </button>
            <Link to="/dashboard/bookings" className="flex-1 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center">
              View Bookings
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-6 transition-colors group">
            <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
          </button>
          <h1 className="font-display font-bold text-3xl text-white mb-6">Book a Service</h1>

          {/* Steps */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1 last:flex-none">
                <div className={`flex items-center gap-2 ${i <= step ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-white text-primary-700 ring-2 ring-white/50' : 'bg-white/20 text-white'}`}>
                    {i < step ? <HiCheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="text-xs font-medium text-white hidden sm:block whitespace-nowrap">{s}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-1 rounded transition-all ${i < step ? 'bg-green-400' : 'bg-white/20'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* Step 0: Select Service */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="font-display font-bold text-xl text-slate-900 mb-5">Select a Service</h2>
              {loadingServices ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((s) => (
                    <button
                      key={s._id || s.id}
                      onClick={() => setSelectedService(s)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all ${selectedService?._id === s._id ? 'border-primary-500 bg-primary-50 shadow-md' : 'border-slate-200 bg-white hover:border-primary-300 hover:bg-slate-50'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-lg flex-shrink-0">
                          {s.category?.icon || '🛠️'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <h3 className="font-semibold text-slate-900 text-sm truncate">{s.title}</h3>
                            {selectedService?._id === s._id && <HiCheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />}
                          </div>
                          <p className="text-xs text-slate-400 mb-1.5">{s.category?.name} · {s.duration || '1-2 hrs'}</p>
                          <p className="font-bold text-primary-600 text-sm">₹{s.price?.amount}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Step 1: Schedule */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="font-display font-bold text-xl text-slate-900 mb-5">Pick a Date & Time</h2>

              <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-lg">
                  {selectedService?.category?.icon || '🛠️'}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{selectedService?.title}</p>
                  <p className="text-xs text-primary-600">₹{selectedService?.price?.amount} · {selectedService?.duration || '1-2 hrs'}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                    <HiCalendar className="w-4 h-4 text-primary-500" /> Select Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-2">
                    <HiClock className="w-4 h-4 text-primary-500" /> Select Time Slot
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2.5 rounded-xl text-xs font-semibold transition-all border ${selectedTime === t ? 'bg-primary-600 text-white border-primary-600 shadow-md' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-primary-300'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="font-display font-bold text-xl text-slate-900 mb-5">Service Address</h2>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address Line 1</label>
                  <div className="relative">
                    <HiLocationMarker className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="House / Flat / Building no., Street"
                      value={address.line1}
                      onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      placeholder="Mumbai"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">PIN Code</label>
                    <input
                      type="text"
                      placeholder="400001"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Special Instructions (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Any specific requirements or access instructions..."
                    value={address.notes}
                    onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm & Pay */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <h2 className="font-display font-bold text-xl text-slate-900 mb-5">Confirm & Pay</h2>
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Booking Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Service</span>
                      <span className="font-semibold text-slate-900">{selectedService?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Date</span>
                      <span className="font-semibold text-slate-900">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Time</span>
                      <span className="font-semibold text-slate-900">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Address</span>
                      <span className="font-semibold text-slate-900 text-right max-w-[200px]">{address.line1}, {address.city} - {address.pincode}</span>
                    </div>
                    <div className="border-t border-slate-100 pt-3 flex justify-between">
                      <span className="font-bold text-slate-900">Total Amount</span>
                      <span className="font-display font-bold text-primary-600 text-lg">₹{selectedService?.price?.amount}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><HiCreditCard className="w-5 h-5 text-slate-500" /> Payment Method</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'stripe', label: 'Stripe Online Payment', sub: 'Credit / Debit Card via Stripe', icon: '💳' },
                      { id: 'cash', label: 'Cash on Service', sub: 'Pay when service is completed', icon: '💵' },
                    ].map((m) => (
                      <label key={m.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMethod === m.id ? 'border-primary-500 bg-primary-50' : 'border-slate-200 hover:border-slate-300'}`}>
                        <input type="radio" name="pay" value={m.id} checked={payMethod === m.id} onChange={() => setPayMethod(m.id)} className="sr-only" />
                        <span className="text-xl">{m.icon}</span>
                        <div>
                          <p className="font-semibold text-slate-900 text-sm">{m.label}</p>
                          <p className="text-xs text-slate-400">{m.sub}</p>
                        </div>
                        {payMethod === m.id && <HiCheckCircle className="w-5 h-5 text-primary-600 ml-auto" />}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
                  <HiShieldCheck className="w-4 h-4 text-green-500" />
                  Payments are 100% secure. Your data is encrypted and protected.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-semibold text-sm hover:border-slate-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <HiArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => canNext() && setStep((s) => s + 1)}
              disabled={!canNext()}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next <HiArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleBook}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-60"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing...</>
              ) : (
                <><HiCheckCircle className="w-4 h-4" /> Confirm Booking</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
