import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { HiCalendar, HiCollection, HiStar, HiArrowRight, HiClock, HiCheckCircle } from 'react-icons/hi';
import { customerApi, serviceApi } from '@/services/api.service';

const StatCard = ({ label, value, icon: Icon, color, bg }) => (
  <div className={`${bg} rounded-2xl p-5 border`}>
    <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-3`}>
      <Icon className="w-5 h-5" />
    </div>
    <p className="font-display font-bold text-slate-900 text-2xl">{value}</p>
    <p className="text-slate-500 text-sm mt-0.5">{label}</p>
  </div>
);

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const [dashRes, srvRes] = await Promise.all([
          customerApi.getDashboard(),
          serviceApi.getAll({ limit: 3 }),
        ]);

        if (dashRes.data?.success) setData(dashRes.data.data);
        if (srvRes.data?.success) setRecommendedServices(srvRes.data.data.services || []);
      } catch {
        // Fallback silently
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = data?.stats || { totalBookings: 0, upcomingBookings: 0, completedBookings: 0, totalReviews: 0 };
  const recentBookings = data?.recentBookings || [];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl border-2 border-white/30 bg-white/20 font-bold text-xl flex items-center justify-center">
                {user?.name?.[0] || 'C'}
              </div>
              <div>
                <p className="text-primary-100 text-sm">Good to see you!</p>
                <h2 className="font-display font-bold text-2xl">{user?.name || 'Customer'} 👋</h2>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-primary-700 rounded-xl text-sm font-bold shadow-md hover:bg-primary-50 transition-all">
                <HiCollection className="w-4 h-4" /> Browse Services
              </Link>
              <Link to="/dashboard/bookings" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl text-sm font-semibold hover:bg-white/30 transition-all">
                <HiCalendar className="w-4 h-4" /> My Bookings
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Total Bookings" value={stats.totalBookings} icon={HiCalendar} color="bg-blue-100 text-blue-600" bg="bg-white border-slate-100" />
            <StatCard label="Completed" value={stats.completedBookings} icon={HiCheckCircle} color="bg-green-100 text-green-600" bg="bg-white border-slate-100" />
            <StatCard label="Upcoming" value={stats.upcomingBookings} icon={HiClock} color="bg-amber-100 text-amber-600" bg="bg-white border-slate-100" />
            <StatCard label="Reviews Given" value={stats.totalReviews || 0} icon={HiStar} color="bg-purple-100 text-purple-600" bg="bg-white border-slate-100" />
          </div>
        </motion.div>
      )}

      {/* Recent Bookings */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-display font-bold text-slate-900">Recent Bookings</h3>
            <Link to="/dashboard/bookings" className="text-primary-600 text-sm font-semibold hover:underline flex items-center gap-1">
              View All <HiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">No recent bookings found.</div>
          ) : (
            <div className="divide-y divide-slate-50">
              {recentBookings.map((booking) => (
                <div key={booking._id || booking.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 font-bold flex items-center justify-center">
                      {booking.service?.title?.[0] || '🛠️'}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{booking.service?.title || 'Service'}</p>
                      <p className="text-xs text-slate-400">{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : ''} at {booking.timeSlot}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 text-sm">₹{booking.totalAmount}</p>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full capitalize bg-blue-50 text-blue-700">{booking.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Recommended Services */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-bold text-slate-900">Recommended For You</h3>
            <Link to="/services" className="text-primary-600 text-sm font-semibold hover:underline">Browse All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedServices.map((s) => (
              <Link key={s._id || s.id} to={`/services/${s._id || s.id}`} className="group flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-primary-50 border border-slate-100 hover:border-primary-200 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-xl flex-shrink-0">
                  {s.category?.icon || '🏠'}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate group-hover:text-primary-600 transition-colors">{s.title}</p>
                  <p className="text-xs text-primary-600 font-medium">₹{s.price?.amount}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerDashboard;
