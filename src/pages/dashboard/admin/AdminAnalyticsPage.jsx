import { motion } from 'framer-motion';
import { HiTrendingUp, HiUsers, HiCalendar, HiCurrencyRupee, HiArrowUp, HiArrowDown } from 'react-icons/hi';

const monthlyData = [
  { month: 'Jan', revenue: 180000, bookings: 320, users: 1200 },
  { month: 'Feb', revenue: 210000, bookings: 380, users: 1450 },
  { month: 'Mar', revenue: 195000, bookings: 350, users: 1380 },
  { month: 'Apr', revenue: 240000, bookings: 420, users: 1680 },
  { month: 'May', revenue: 280000, bookings: 510, users: 2100 },
  { month: 'Jun', revenue: 265000, bookings: 490, users: 1950 },
  { month: 'Jul', revenue: 245000, bookings: 450, users: 1820 },
];

const categoryData = [
  { name: 'Home Cleaning', pct: 32, color: 'bg-blue-500', bookings: 4823 },
  { name: 'Plumbing', pct: 18, color: 'bg-orange-500', bookings: 2710 },
  { name: 'Electrical', pct: 15, color: 'bg-yellow-500', bookings: 2258 },
  { name: 'Tutoring', pct: 14, color: 'bg-purple-500', bookings: 2108 },
  { name: 'Painting', pct: 11, color: 'bg-pink-500', bookings: 1656 },
  { name: 'Others', pct: 10, color: 'bg-slate-400', bookings: 1505 },
];

const topProviders = [
  { name: 'Priya Sharma', category: 'Home Cleaning', rating: 4.9, jobs: 847, revenue: '₹4.2L', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
  { name: 'Ananya Singh', category: 'Tutoring', rating: 4.9, jobs: 1120, revenue: '₹3.9L', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya' },
  { name: 'Amelia Chen', category: 'Electrical', rating: 4.95, jobs: 710, revenue: '₹4.2L', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amelia' },
  { name: 'Rahul Verma', category: 'Plumbing', rating: 4.8, jobs: 520, revenue: '₹2.6L', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

const AdminAnalyticsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="font-display font-bold text-2xl text-slate-900">Analytics & Reports</h1>
      <p className="text-slate-500 text-sm mt-0.5">Platform performance overview · July 2026</p>
    </div>

    {/* KPI Cards */}
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Monthly Revenue', value: '₹24.5L', change: '+18.2%', up: true, icon: HiCurrencyRupee, color: 'bg-green-100 text-green-600' },
        { label: 'Total Bookings', value: '45,880', change: '+12.4%', up: true, icon: HiCalendar, color: 'bg-blue-100 text-blue-600' },
        { label: 'Active Users', value: '18,420', change: '+9.1%', up: true, icon: HiUsers, color: 'bg-purple-100 text-purple-600' },
        { label: 'Avg Order Value', value: '₹534', change: '-2.3%', up: false, icon: HiTrendingUp, color: 'bg-amber-100 text-amber-600' },
      ].map(({ label, value, change, up, icon: Icon, color }) => (
        <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-card p-5">
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className={`flex items-center gap-0.5 text-xs font-bold ${up ? 'text-green-600' : 'text-red-500'}`}>
              {up ? <HiArrowUp className="w-3 h-3" /> : <HiArrowDown className="w-3 h-3" />}
              {change}
            </span>
          </div>
          <p className="font-display font-bold text-2xl text-slate-900">{value}</p>
          <p className="text-slate-500 text-sm mt-0.5">{label}</p>
        </div>
      ))}
    </motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue Bar Chart */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-bold text-slate-900">Revenue Trend</h3>
            <p className="text-slate-400 text-xs mt-0.5">Monthly revenue in ₹</p>
          </div>
          <div className="flex gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-purple-500 rounded" />Revenue</span>
          </div>
        </div>
        <div className="flex items-end gap-2 h-44">
          {monthlyData.map((d, i) => {
            const heightPct = Math.round((d.revenue / maxRevenue) * 100);
            const isLatest = i === monthlyData.length - 1;
            return (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full flex items-end justify-center" style={{ height: '148px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPct}%` }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: 'easeOut' }}
                    className={`w-full rounded-t-xl ${isLatest ? 'bg-gradient-to-t from-purple-600 to-violet-400' : 'bg-gradient-to-t from-slate-200 to-slate-100 group-hover:from-purple-200 group-hover:to-purple-100'} transition-colors relative`}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      ₹{(d.revenue / 1000).toFixed(0)}K
                    </div>
                  </motion.div>
                </div>
                <span className={`text-xs font-medium ${isLatest ? 'text-purple-600 font-bold' : 'text-slate-400'}`}>{d.month}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <h3 className="font-display font-bold text-slate-900 mb-5">Bookings by Category</h3>
        <div className="space-y-3">
          {categoryData.map((cat, i) => (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-700">{cat.name}</span>
                <span className="text-xs font-bold text-slate-500">{cat.pct}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.pct}%` }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
                  className={`h-full ${cat.color} rounded-full`}
                />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{cat.bookings.toLocaleString()} bookings</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Booking Volume Chart + Top Providers */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Bookings */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <h3 className="font-display font-bold text-slate-900 mb-5">Monthly Booking Volume</h3>
        <div className="space-y-3">
          {monthlyData.map((d, i) => {
            const pct = Math.round((d.bookings / Math.max(...monthlyData.map((x) => x.bookings))) * 100);
            return (
              <div key={d.month} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 w-7">{d.month}</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-700 w-8 text-right">{d.bookings}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Top Providers */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <h3 className="font-display font-bold text-slate-900 mb-5">Top Performing Providers</h3>
        <div className="space-y-4">
          {topProviders.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <span className="w-5 text-xs font-bold text-slate-400 text-center">{i + 1}</span>
              <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full bg-slate-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 text-sm truncate">{p.name}</p>
                <p className="text-xs text-slate-400">{p.category} · ⭐ {p.rating}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700 text-sm">{p.revenue}</p>
                <p className="text-xs text-slate-400">{p.jobs} jobs</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default AdminAnalyticsPage;
