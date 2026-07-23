import { motion } from 'framer-motion';
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import { categories } from '@/data/placeholderData';

const AdminCategoriesPage = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-display font-bold text-2xl text-slate-900">Category Management</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage service categories available on the platform</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-700 to-violet-600 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all">
        <HiPlus className="w-4 h-4" /> Add Category
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-card p-5 hover:shadow-card-hover transition-all group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
              {cat.icon}
            </div>
            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"><HiPencil className="w-4 h-4" /></button>
              <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><HiTrash className="w-4 h-4" /></button>
            </div>
          </div>
          <h3 className="font-display font-bold text-slate-900 text-base mb-1">{cat.name}</h3>
          <p className="text-xs text-slate-400 mb-3">{cat.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">{cat.count}+ providers</span>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400" title="Active" />
              <span className="text-xs text-slate-400">Active</span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Add Category Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: categories.length * 0.06 }}>
        <button className="w-full h-full min-h-[180px] border-2 border-dashed border-slate-300 hover:border-purple-400 rounded-2xl flex flex-col items-center justify-center gap-3 group transition-all hover:bg-purple-50/50">
          <div className="w-12 h-12 bg-slate-100 group-hover:bg-purple-100 rounded-2xl flex items-center justify-center transition-all">
            <HiPlus className="w-6 h-6 text-slate-400 group-hover:text-purple-600 transition-colors" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-500 group-hover:text-purple-700 transition-colors text-sm">Add New Category</p>
            <p className="text-xs text-slate-400 mt-0.5">Expand the service catalog</p>
          </div>
        </button>
      </motion.div>
    </div>
  </div>
);

export default AdminCategoriesPage;
