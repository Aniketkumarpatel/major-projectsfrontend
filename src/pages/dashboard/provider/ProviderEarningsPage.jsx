import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCurrencyRupee, HiTrendingUp, HiCalendar, HiDownload, HiClock } from 'react-icons/hi';

const earningsData = [
  { month: 'Feb', amount: 3200, jobs: 8 },
  { month: 'Mar', amount: 4100, jobs: 11 },
  { month: 'Apr', amount: 3800, jobs: 10 },
  { month: 'May', amount: 5200, jobs: 14 },
  { month: 'Jun', amount: 4700, jobs: 13 },
  { month: 'Jul', amount: 4997, jobs: 12 },
];

const transactions = [
  { id: 'TXN-8821', service: 'Deep Home Cleaning', customer: 'Riya Desai', date: '2026-07-15', amount: 999, status: 'Paid' },
  { id: 'TXN-8809', service: 'Office Cleaning', customer: 'Arjun Mehta', date: '2026-07-12', amount: 1799, status: 'Paid' },
  { id: 'TXN-8795', service: 'Post-Construction Clean', customer: 'Sunita Rao', date: '2026-07-08', amount: 2199, status: 'Pending' },
  { id: 'TXN-8780', service: 'Regular Cleaning', customer: 'Karthik Nair', date: '2026-07-02', amount: 499, status: 'Paid' },
];

const maxAmount = Math.max(...earningsData.map((d) => d.amount));

const ProviderEarningsPage = () => {
  const [period, setPeriod] = useState('monthly');

  const totalEarnings = earningsData.reduce((sum, d) => sum + d.amount, 0);
  const thisMonth = earningsData[earningsData.length - 1].amount;
  const lastMonth = earningsData[earningsData.length - 2].amount;
  const growth = (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">Earnings</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track your income and payment history</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:border-green-300 hover:text-green-600 transition-all">
          <HiDownload className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Stats Cards */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'This Month', value: `₹${thisMonth.toLocaleString()}`, icon: HiCurrencyRupee, color: 'bg-green-100 text-green-600', sub: `↑ ${growth}% vs last month` },
          { label: 'Total Earned', value: `₹${totalEarnings.toLocaleString()}`, icon: HiTrendingUp, color: 'bg-blue-100 text-blue-600', sub: 'All time' },
          { label: 'Jobs This Month', value: earningsData[earningsData.length - 1].jobs, icon: HiCalendar, color: 'bg-purple-100 text-purple-600', sub: 'Completed' },
          { label: 'Avg Per Job', value: `₹${Math.round(thisMonth / earningsData[earningsData.length - 1].jobs)}`, icon: HiClock, color: 'bg-amber-100 text-amber-600', sub: 'This month' },
        ].map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
            <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="font-display font-bold text-2xl text-slate-900">{value}</p>
            <p className="text-slate-500 text-sm">{label}</p>
            {sub && <p className="text-xs text-green-600 font-medium mt-0.5">{sub}</p>}
          </div>
        ))}
      </motion.div>

      {/* Bar Chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-slate-900">Earnings Overview</h3>
          <div className="flex gap-2">
            {['monthly', 'weekly'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${period === p ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-3 h-48">
          {earningsData.map((d, i) => {
            const heightPct = Math.round((d.amount / maxAmount) * 100);
            const isLatest = i === earningsData.length - 1;
            return (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full flex items-end justify-center" style={{ height: '168px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: 'easeOut' }}
                    className={`w-full rounded-t-xl ${isLatest ? 'bg-gradient-to-t from-green-600 to-emerald-400' : 'bg-gradient-to-t from-slate-200 to-slate-100 group-hover:from-green-200 group-hover:to-green-100'} transition-colors relative`}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      ₹{d.amount.toLocaleString()}
                    </div>
                  </motion.div>
                </div>
                <span className={`text-xs font-semibold ${isLatest ? 'text-green-600' : 'text-slate-400'}`}>{d.month}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Feb – Jul 2026</span>
          <span className="flex items-center gap-1 text-green-600 font-medium"><HiTrendingUp className="w-3.5 h-3.5" /> +{growth}% this month</span>
        </div>
      </motion.div>

      {/* Transactions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="font-display font-bold text-slate-900">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-slate-50">
          {transactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="px-6 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <HiCurrencyRupee className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{tx.service}</p>
                  <p className="text-xs text-slate-400">{tx.customer} · {tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700">+₹{tx.amount.toLocaleString()}</p>
                <span className={`text-xs font-bold ${tx.status === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>{tx.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProviderEarningsPage;
