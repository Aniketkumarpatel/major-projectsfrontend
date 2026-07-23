import { motion } from 'framer-motion';
import { HiCalendar, HiLocationMarker, HiClock } from 'react-icons/hi';
import { providerBookings } from '@/data/placeholderData';

const ProviderBookingsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="font-display font-bold text-2xl text-slate-900">My Bookings</h1>
      <p className="text-slate-500 text-sm mt-0.5">Manage incoming and past service bookings</p>
    </div>

    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex gap-2">
        {['All', 'Pending', 'Confirmed', 'In Progress', 'Completed'].map((s) => (
          <span key={s} className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-600 rounded-lg cursor-pointer hover:bg-primary-50 hover:text-primary-600 transition-all">{s}</span>
        ))}
      </div>
      <div className="divide-y divide-slate-50">
        {providerBookings.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-4 hover:bg-slate-50/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl flex-shrink-0">🧹</div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-semibold text-slate-900">{b.service}</h3>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${b.statusColor}`}>{b.status}</span>
              </div>
              <p className="text-sm text-slate-500">Customer: <span className="font-medium text-slate-700">{b.customer}</span></p>
              <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-slate-400">
                <span className="flex items-center gap-1"><HiCalendar className="w-3.5 h-3.5" /> {b.date} at {b.time}</span>
                <span className="flex items-center gap-1"><HiLocationMarker className="w-3.5 h-3.5" /> {b.address}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-green-700 text-lg">{b.amount}</span>
              {b.status === 'Pending' && (
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 text-xs font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">Accept</button>
                  <button className="px-4 py-1.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all">Decline</button>
                </div>
              )}
              {b.status === 'In Progress' && (
                <button className="px-4 py-1.5 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">Mark Done</button>
              )}
              {b.status === 'Confirmed' && (
                <button className="px-4 py-1.5 text-xs font-bold bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-all">View Details</button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default ProviderBookingsPage;
