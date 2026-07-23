import { motion } from 'framer-motion';
import { HiSearch, HiPencil, HiTrash, HiStar, HiCheckCircle, HiEye } from 'react-icons/hi';
import { services } from '@/data/placeholderData';

const AdminServicesPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-display font-bold text-2xl text-slate-900">Services Management</h1>
        <p className="text-slate-500 text-sm mt-0.5">Review and manage all platform services</p>
      </div>
      <div className="text-sm text-slate-500">{services.length} total services</div>
    </div>

    {/* Search */}
    <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-4">
      <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-200">
        <HiSearch className="w-4 h-4 text-slate-400" />
        <input type="text" placeholder="Search services..." className="flex-1 text-sm text-slate-700 bg-transparent outline-none placeholder-slate-400" />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {services.map((s, i) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 hover:shadow-card-hover transition-all"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-slate-900 mb-0.5">{s.title}</h3>
              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-100">{s.category}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"><HiEye className="w-4 h-4" /></button>
              <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"><HiPencil className="w-4 h-4" /></button>
              <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><HiTrash className="w-4 h-4" /></button>
            </div>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 mb-3">{s.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <HiStar className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-bold text-slate-700">{s.rating}</span>
                <span>({s.reviews})</span>
              </span>
              <span className="flex items-center gap-1">
                <HiCheckCircle className="w-3.5 h-3.5 text-green-500" />
                {s.provider.name}
              </span>
            </div>
            <span className="font-bold text-purple-700 text-base">{s.price}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default AdminServicesPage;
