import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { HiCalendar, HiCollection, HiStar, HiArrowRight, HiTrendingUp, HiCurrencyRupee, HiClock } from 'react-icons/hi';
import { providerApi, bookingApi } from '@/services/api.service';
import { toast } from 'react-hot-toast';

const StatCard = ({ label, value, icon: Icon, color, sub }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
    <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-3`}>
      <Icon className="w-5 h-5" />
    </div>
    <p className="font-display font-bold text-slate-900 text-2xl">{value}</p>
    <p className="text-slate-500 text-sm mt-0.5">{label}</p>
    {sub && <p className="text-xs text-green-600 font-medium mt-1">{sub}</p>}
  </div>
);

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await providerApi.getDashboard();
      if (res.data?.success) {
        setData(res.data.data);
      }
    } catch {
      // Silently catch
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleAccept = async (id) => {
    try {
      const res = await bookingApi.accept(id);
      if (res.data?.success) {
        toast.success('Booking accepted successfully!');
        fetchDashboard();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to accept booking');
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await bookingApi.reject(id, 'Provider unavailable');
      if (res.data?.success) {
        toast.success('Booking declined');
        fetchDashboard();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to decline booking');
    }
  };

  const stats = data?.stats || { totalBookings: 0, pendingBookings: 0, completedBookings: 0, averageRating: 4.5, totalEarnings: 0 };
  const recentBookings = data?.recentBookings || [];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl border-2 border-white/30 bg-white/20 font-bold text-xl flex items-center justify-center">
                {user?.name?.[0] || 'P'}
              </div>
              <div>
                <p className="text-green-100 text-sm">Provider Dashboard</p>
                <h2 className="font-display font-bold text-2xl">{user?.name || 'Provider'} 🔧</h2>
                <p className="text-green-200 text-xs mt-0.5">Manage job requests and track earnings</p>
              </div>
            </div>
            <Link to="/provider/services" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-green-700 rounded-xl text-sm font-bold shadow-md hover:bg-green-50 transition-all">
              <HiCollection className="w-4 h-4" /> Manage Services
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Bookings" value={stats.totalBookings} icon={HiCalendar} color="bg-blue-100 text-blue-600" />
            <StatCard label="Total Earnings" value={`₹${stats.totalEarnings}`} icon={HiCurrencyRupee} color="bg-green-100 text-green-600" sub="Verified payouts" />
            <StatCard label="Avg Rating" value={stats.averageRating || 4.5} icon={HiStar} color="bg-amber-100 text-amber-600" />
            <StatCard label="Pending Jobs" value={stats.pendingBookings} icon={HiTrendingUp} color="bg-purple-100 text-purple-600" />
          </div>
        </motion.div>
      )}

      {/* Incoming Bookings */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-display font-bold text-slate-900">Incoming & Assigned Bookings</h3>
            <Link to="/provider/bookings" className="text-green-600 text-sm font-semibold hover:underline flex items-center gap-1">
              View All <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">No incoming bookings found.</div>
          ) : (
            <div className="divide-y divide-slate-50">
              {recentBookings.map((b, i) => (
                <motion.div
                  key={b._id || b.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-semibold text-slate-900 text-sm">{b.service?.title || 'Service Booking'}</p>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full capitalize bg-blue-50 text-blue-700">{b.status}</span>
                    </div>
                    <p className="text-sm text-slate-500">Customer: <span className="font-medium text-slate-700">{b.customer?.name || 'Customer'}</span></p>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                      <HiClock className="w-3.5 h-3.5" /> {b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : ''} at {b.timeSlot}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-green-700 text-base">₹{b.totalAmount}</span>
                    {b.status === 'pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => handleAccept(b._id)} className="text-xs font-bold px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">Accept</button>
                        <button onClick={() => handleReject(b._id)} className="text-xs font-bold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all">Decline</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProviderDashboard;
