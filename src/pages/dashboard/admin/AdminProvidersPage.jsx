import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiEye, HiBadgeCheck, HiSearch, HiClock } from 'react-icons/hi';

const pendingProviders = [
  { id: 'PRV-441', name: 'Deepak Joshi', category: 'Carpentry', city: 'Pune', experience: '5 years', submitted: '2026-07-17', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak', docs: 'Verified' },
  { id: 'PRV-440', name: 'Fatima Khan', category: 'Beauty & Spa', city: 'Mumbai', experience: '3 years', submitted: '2026-07-16', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima', docs: 'Pending' },
  { id: 'PRV-439', name: 'Suresh Nair', category: 'Electrical', city: 'Bangalore', experience: '8 years', submitted: '2026-07-15', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh', docs: 'Verified' },
  { id: 'PRV-438', name: 'Kavya Reddy', category: 'Tutoring', city: 'Hyderabad', experience: '4 years', submitted: '2026-07-14', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya', docs: 'Verified' },
];

const AdminProvidersPage = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = pendingProviders.filter((p) => {
    const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase());
    const matchF = filter === 'All' || p.docs === filter;
    return matchQ && matchF;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">Provider Approvals</h1>
          <p className="text-slate-500 text-sm mt-0.5">Review and approve new provider applications</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-amber-700">{pendingProviders.length} pending review</span>
        </div>
      </div>

      {/* Search + Filter */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-200">
            <HiSearch className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search by name or category..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 text-sm text-slate-700 bg-transparent outline-none placeholder-slate-400" />
          </div>
          <div className="flex gap-2">
            {['All', 'Verified', 'Pending'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${filter === f ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{f}</button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Provider Cards */}
      <div className="space-y-4">
        {filtered.map((provider, i) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-card p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-4 flex-1">
                <img src={provider.avatar} alt={provider.name} className="w-14 h-14 rounded-2xl border border-slate-100 bg-slate-50 flex-shrink-0" />
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900">{provider.name}</h3>
                    <span className="text-xs font-mono text-slate-400">{provider.id}</span>
                  </div>
                  <p className="text-sm text-purple-600 font-medium">{provider.category} · {provider.city}</p>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><HiClock className="w-3.5 h-3.5" /> {provider.experience} exp.</span>
                    <span>Applied: {provider.submitted}</span>
                    <span className={`flex items-center gap-1 font-bold ${provider.docs === 'Verified' ? 'text-green-600' : 'text-amber-600'}`}>
                      {provider.docs === 'Verified' ? <HiBadgeCheck className="w-3.5 h-3.5" /> : <HiClock className="w-3.5 h-3.5" />}
                      Docs: {provider.docs}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all">
                  <HiEye className="w-4 h-4" /> View Docs
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl transition-all">
                  <HiXCircle className="w-4 h-4" /> Reject
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl transition-all shadow-sm">
                  <HiCheckCircle className="w-4 h-4" /> Approve
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminProvidersPage;
