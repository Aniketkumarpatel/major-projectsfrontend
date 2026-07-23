import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiFilter, HiCalendar } from 'react-icons/hi';
import { bookings } from '@/data/placeholderData';

const statusColors = {
  Confirmed: 'bg-green-100 text-green-700 border-green-200',
  Completed: 'bg-blue-100 text-blue-700 border-blue-200',
  Cancelled: 'bg-red-100 text-red-700 border-red-200',
  Pending: 'bg-amber-100 text-amber-700 border-amber-200',
};

const MyBookingsPage = () => {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = bookings.filter((b) => {
    const matchFilter = filter === 'All' || b.status === filter;
    const matchQuery = !query || b.service.toLowerCase().includes(query.toLowerCase()) || b.provider.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">My Bookings</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track and manage all your service bookings</p>
        </div>
      </div>

      {/* Search and Filter */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-200">
            <HiSearch className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search bookings..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 text-sm text-slate-700 bg-transparent outline-none placeholder-slate-400" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', 'Confirmed', 'Completed', 'Pending', 'Cancelled'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${filter === s ? 'bg-primary-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bookings List */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-16 text-center">
            <div className="text-5xl mb-3">📋</div>
            <h3 className="font-bold text-slate-900 mb-1">No bookings found</h3>
            <p className="text-slate-400 text-sm">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filtered.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-xl flex-shrink-0">
                  {booking.category === 'Home Cleaning' ? '🧹' : booking.category === 'Electrical' ? '⚡' : booking.category === 'Plumbing' ? '🔧' : booking.category === 'Painting' ? '🎨' : '📚'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900">{booking.service}</h3>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusColors[booking.status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>{booking.status}</span>
                  </div>
                  <p className="text-sm text-slate-500">Provider: <span className="font-medium text-slate-700">{booking.provider}</span></p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><HiCalendar className="w-3.5 h-3.5" /> {booking.date} at {booking.time}</span>
                    <span className="font-mono text-slate-300">{booking.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="text-right">
                    <p className="font-display font-bold text-slate-900 text-lg">{booking.amount}</p>
                  </div>
                  {booking.status === 'Confirmed' && (
                    <button className="text-xs font-bold px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-lg transition-all">Cancel</button>
                  )}
                  {booking.status === 'Completed' && (
                    <button className="text-xs font-bold px-3 py-1.5 text-amber-600 bg-amber-50 hover:bg-amber-100 border border-amber-100 rounded-lg transition-all">Rate</button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MyBookingsPage;
