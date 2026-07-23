import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiUsers, HiCheckCircle, HiBan, HiEye } from 'react-icons/hi';
import { adminUsers } from '@/data/placeholderData';

const roleColors = { customer: 'bg-blue-100 text-blue-700', provider: 'bg-green-100 text-green-700', admin: 'bg-purple-100 text-purple-700' };
const statusColors = { Active: 'bg-green-100 text-green-700', Suspended: 'bg-red-100 text-red-700' };

const AdminUsersPage = () => {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filtered = adminUsers.filter((u) => {
    const matchQ = !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase());
    const matchR = roleFilter === 'All' || u.role === roleFilter;
    return matchQ && matchR;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">User Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage all platform users, providers, and admins</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <HiUsers className="w-5 h-5" />
          <span><strong>{adminUsers.length}</strong> total users</span>
        </div>
      </div>

      {/* Search and Filters */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-200">
            <HiSearch className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search by name or email..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 text-sm text-slate-700 bg-transparent outline-none placeholder-slate-400" />
          </div>
          <div className="flex gap-2">
            {['All', 'customer', 'provider', 'admin'].map((r) => (
              <button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all capitalize ${roleFilter === r ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{r}</button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['User', 'Email', 'Role', 'Status', 'Joined', 'Bookings', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((u, i) => (
                <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} alt={u.name} className="w-8 h-8 rounded-full bg-slate-100" />
                      <span className="font-semibold text-slate-900 whitespace-nowrap">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{u.email}</td>
                  <td className="px-5 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${roleColors[u.role]}`}>{u.role}</span></td>
                  <td className="px-5 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[u.status]}`}>{u.status}</span></td>
                  <td className="px-5 py-4 text-slate-400">{u.joined}</td>
                  <td className="px-5 py-4 font-semibold text-slate-700">{u.bookings}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"><HiEye className="w-4 h-4" /></button>
                      {u.status === 'Active' ? (
                        <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><HiBan className="w-4 h-4" /></button>
                      ) : (
                        <button className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"><HiCheckCircle className="w-4 h-4" /></button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-400">No users found matching your criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminUsersPage;
