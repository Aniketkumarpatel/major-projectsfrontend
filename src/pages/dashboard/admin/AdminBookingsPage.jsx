import { motion } from 'framer-motion';
import { HiCalendar, HiFilter, HiEye, HiBan } from 'react-icons/hi';
import { adminRecentBookings } from '@/data/placeholderData';

const extendedBookings = [
  ...adminRecentBookings,
  { id: 'BK-7885', customer: 'Meera J.', provider: 'Carlos M.', service: 'Carpentry', amount: '₹699', status: 'Completed', date: '2026-07-16' },
  { id: 'BK-7884', customer: 'Karthik N.', provider: 'Ananya S.', service: 'Tutoring', amount: '₹350', status: 'Confirmed', date: '2026-07-15' },
  { id: 'BK-7883', customer: 'Riya D.', provider: 'Rohan K.', service: 'Painting', amount: '₹1499', status: 'In Progress', date: '2026-07-15' },
];

const statusColor = (s) => {
  if (s === 'Completed') return 'bg-blue-100 text-blue-700';
  if (s === 'Confirmed') return 'bg-green-100 text-green-700';
  if (s === 'Pending') return 'bg-amber-100 text-amber-700';
  if (s === 'Cancelled') return 'bg-red-100 text-red-700';
  if (s === 'In Progress') return 'bg-indigo-100 text-indigo-700';
  return 'bg-slate-100 text-slate-700';
};

const AdminBookingsPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-display font-bold text-2xl text-slate-900">Booking Management</h1>
        <p className="text-slate-500 text-sm mt-0.5">Monitor and manage all platform bookings</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:border-primary-300 hover:text-primary-600 transition-all">
        <HiFilter className="w-4 h-4" /> Filter
      </button>
    </div>

    {/* Status Summary */}
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[
        { label: 'All Bookings', value: extendedBookings.length, color: 'bg-purple-100 text-purple-700 border-purple-200' },
        { label: 'Completed', value: extendedBookings.filter(b => b.status === 'Completed').length, color: 'bg-blue-100 text-blue-700 border-blue-200' },
        { label: 'Active', value: extendedBookings.filter(b => ['Confirmed', 'In Progress', 'Pending'].includes(b.status)).length, color: 'bg-green-100 text-green-700 border-green-200' },
        { label: 'Cancelled', value: extendedBookings.filter(b => b.status === 'Cancelled').length, color: 'bg-red-100 text-red-700 border-red-200' },
      ].map(({ label, value, color }) => (
        <div key={label} className={`rounded-xl p-4 border ${color}`}>
          <p className="font-display font-bold text-2xl">{value}</p>
          <p className="text-xs font-medium mt-0.5">{label}</p>
        </div>
      ))}
    </motion.div>

    {/* Table */}
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['Booking ID', 'Customer', 'Provider', 'Service', 'Amount', 'Status', 'Date', 'Actions'].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {extendedBookings.map((b, i) => (
              <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-4 font-mono text-xs text-slate-500">{b.id}</td>
                <td className="px-5 py-4 font-medium text-slate-900 whitespace-nowrap">{b.customer}</td>
                <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{b.provider}</td>
                <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{b.service}</td>
                <td className="px-5 py-4 font-semibold text-slate-900">{b.amount}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor(b.status)}`}>{b.status}</span>
                </td>
                <td className="px-5 py-4 text-slate-400 whitespace-nowrap">{b.date}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"><HiEye className="w-4 h-4" /></button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><HiBan className="w-4 h-4" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  </div>
);

export default AdminBookingsPage;
