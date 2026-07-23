import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiPlus, HiPencil, HiTrash, HiStar, HiCheckCircle } from 'react-icons/hi';
import { services } from '@/data/placeholderData';

const ManageServicesPage = () => {
  const providerServices = services.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-slate-900">My Services</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage the services you offer to customers</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all">
          <HiPlus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {providerServices.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-card p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-2xl">🧹</div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">{s.title}</h3>
                  <p className="text-xs text-green-600 font-medium">{s.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                  <HiPencil className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 mb-4">{s.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {s.features.slice(0, 3).map((f) => (
                <span key={f} className="flex items-center gap-1 text-xs px-2 py-1 bg-slate-50 text-slate-600 rounded-lg border border-slate-100">
                  <HiCheckCircle className="w-3 h-3 text-green-500" /> {f}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-bold text-green-700">{s.price}</span>
                <span className="text-slate-400 text-xs">{s.duration}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <HiStar className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-slate-700">{s.rating}</span>
                <span className="text-slate-400 text-xs">({s.reviews})</span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add Service CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <button className="w-full h-full min-h-[200px] border-2 border-dashed border-slate-300 hover:border-green-400 rounded-2xl flex flex-col items-center justify-center gap-3 group transition-all hover:bg-green-50/50">
            <div className="w-12 h-12 bg-slate-100 group-hover:bg-green-100 rounded-2xl flex items-center justify-center transition-all">
              <HiPlus className="w-6 h-6 text-slate-400 group-hover:text-green-600 transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-slate-500 group-hover:text-green-700 transition-colors text-sm">Add New Service</p>
              <p className="text-xs text-slate-400 mt-0.5">Expand your offerings</p>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageServicesPage;
