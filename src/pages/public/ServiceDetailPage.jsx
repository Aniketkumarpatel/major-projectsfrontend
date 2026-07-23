import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiStar, HiCheckCircle, HiLocationMarker, HiClock, HiArrowLeft, HiShieldCheck } from 'react-icons/hi';
import { serviceApi } from '@/services/api.service';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await serviceApi.getById(id);
        if (res.data?.success) {
          setService(res.data.data.service);
        } else {
          setError('Service details not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load service details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Service Not Found</h2>
        <p className="text-slate-500 mb-6">{error || 'The requested service is unavailable.'}</p>
        <button onClick={() => navigate('/services')} className="px-6 py-3 bg-primary-600 text-white rounded-xl font-bold">
          Back to Services
        </button>
      </div>
    );
  }

  const provider = service.provider || {};
  const categoryIcon = service.category?.icon || '🔧';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-primary-900 to-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors text-sm mb-6 group">
            <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </button>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <span className="text-xs font-bold px-3 py-1 bg-white/10 text-white rounded-full border border-white/20 mb-3 inline-block">
                {service.category?.name || 'Verified Service'}
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">{service.title}</h1>
              <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-2xl">{service.description}</p>
              <div className="flex flex-wrap items-center gap-5 text-sm">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <HiStar className="w-5 h-5" />
                  <span className="font-bold text-white">{service.rating || 4.5}</span>
                  <span className="text-slate-400">({service.numReviews || 0} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <HiClock className="w-4 h-4" />
                  {service.duration || '1-2 hrs'}
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <HiLocationMarker className="w-4 h-4" />
                  {service.location?.city || provider.location?.city || 'Mumbai'}
                </div>
              </div>
            </div>
            {/* Price Card */}
            <div className="lg:w-72 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="text-4xl font-display font-bold text-white mb-1">₹{service.price?.amount}</div>
              <p className="text-slate-300 text-sm mb-5">Fixed Rate • {service.duration || '1-2 hrs'}</p>
              <Link
                to={`/booking?serviceId=${service._id}`}
                className="block w-full text-center py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl shadow-lg transition-all mb-3"
              >
                Book Service Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Display Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden"
            >
              <div className="h-56 bg-gradient-to-br from-primary-600 to-indigo-700 flex items-center justify-center">
                <span className="text-8xl opacity-80">{categoryIcon}</span>
              </div>
            </motion.div>

            {/* Guarantee */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <HiShieldCheck className="w-6 h-6 text-green-600" />
                <h3 className="font-display font-bold text-green-900">100% ServEase Satisfaction Guarantee</h3>
              </div>
              <p className="text-green-800 text-sm leading-relaxed">
                Not satisfied with the service? We will arrange a free re-service or issue a full refund within 48 hours — no questions asked.
              </p>
            </motion.div>
          </div>

          {/* Right: Provider Card */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
              <h2 className="font-display font-bold text-slate-900 text-lg mb-4">About the Provider</h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-700 font-bold text-xl flex items-center justify-center">
                  {provider.businessName?.[0] || 'P'}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900">{provider.businessName || 'Verified Business'}</h3>
                    <HiCheckCircle className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-xs text-slate-400">{provider.location?.city || 'Mumbai'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
                  <p className="font-bold text-amber-700 text-lg">{provider.rating || 4.5}</p>
                  <p className="text-xs text-amber-600">Rating</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                  <p className="font-bold text-green-700 text-lg">{provider.completedJobs || 12}</p>
                  <p className="text-xs text-green-600">Jobs Done</p>
                </div>
              </div>
            </motion.div>

            {/* Book CTA */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-gradient-to-br from-primary-600 to-primary-500 rounded-2xl p-6 text-white">
              <h3 className="font-display font-bold text-xl mb-2">Ready to Book?</h3>
              <p className="text-primary-100 text-sm mb-5">Pick your date and time slot to confirm your booking.</p>
              <Link
                to={`/booking?serviceId=${service._id}`}
                className="block w-full text-center py-3 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-all shadow-lg"
              >
                Book This Service
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
