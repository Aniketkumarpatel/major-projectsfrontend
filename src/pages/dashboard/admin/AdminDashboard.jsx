import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiUsers, HiCalendar, HiCurrencyRupee, HiExclamation, HiShieldCheck, HiStar } from 'react-icons/hi';
import { adminApi } from '@/services/api.service';

const StatCard = ({ label, value, icon: Icon, color, subLabel }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
    <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-3`}>
      <Icon className="w-5 h-5" />
    </div>
    <p className="font-display font-bold text-slate-900 text-2xl">{value}</p>
    <p className="text-slate-500 text-sm mt-0.5">{label}</p>
    {subLabel && <p className="text-xs text-purple-600 font-medium mt-1">{subLabel}</p>}
  </div>
);

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminDash = async () => {
      try {
        setLoading(true);
        const res = await adminApi.getDashboard();
        if (res.data?.success) {
          setData(res.data.data);
        }
      } catch {
        // Silently catch
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDash();
  }, []);

  const stats = data?.stats || { totalUsers: 0, totalProviders: 0, totalServices: 0, totalBookings: 0, totalRevenue: 0 };
  const recentActivity = data?.recentActivity || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-gradient-to-r from-purple-700 to-violet-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <p className="text-purple-200 text-sm">System Administrator</p>
            <h2 className="font-display font-bold text-3xl mb-1">Admin Console 🛡️</h2>
            <p className="text-purple-200 text-sm">Live Platform Analytics & Real-Time Controls</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Users" value={stats.totalUsers} icon={HiUsers} color="bg-blue-100 text-blue-600" />
              <StatCard label="Providers" value={stats.totalProviders} icon={HiShieldCheck} color="bg-green-100 text-green-600" />
              <StatCard label="Total Bookings" value={stats.totalBookings} icon={HiCalendar} color="bg-purple-100 text-purple-600" />
              <StatCard label="Total Revenue" value={`₹${stats.totalRevenue}`} icon={HiCurrencyRupee} color="bg-amber-100 text-amber-600" />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <HiExclamation className="w-5 h-5 text-amber-600" />
                <p className="font-semibold text-amber-900 text-sm">Active Services</p>
              </div>
              <p className="font-display font-bold text-3xl text-amber-700">{stats.totalServices}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <HiStar className="w-5 h-5 text-purple-600" />
                <p className="font-semibold text-purple-900 text-sm">Platform Health</p>
              </div>
              <p className="font-display font-bold text-3xl text-purple-700">100%</p>
            </motion.div>
          </div>
        </>
      )}

      {/* Recent Activity Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h3 className="font-display font-bold text-slate-900">Recent Platform Activity</h3>
          </div>
          {recentActivity.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">No recent platform activity logged.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Booking ID', 'Customer', 'Provider', 'Service', 'Amount', 'Status', 'Date'].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentActivity.map((b) => (
                    <tr key={b._id || b.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-xs text-slate-500">{b.bookingNumber || b._id?.substring(0, 8)}</td>
                      <td className="px-5 py-4 font-medium text-slate-900 whitespace-nowrap">{b.customer?.name || 'Customer'}</td>
                      <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{b.provider?.businessName || 'Provider'}</td>
                      <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{b.service?.title || 'Service'}</td>
                      <td className="px-5 py-4 font-semibold text-slate-900">₹{b.totalAmount}</td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 capitalize">{b.status}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-400 whitespace-nowrap">{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
