import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categoryApi } from '@/services/api.service';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await categoryApi.getAll();
        if (res.data?.success) {
          setCategories(res.data.data.categories || []);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-primary-900 to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl sm:text-5xl text-white mb-3">
            All Service Categories
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-slate-400 text-lg">
            Browse all verified professional service categories available on ServEase
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500 bg-red-50 rounded-2xl border border-red-200">
            <p className="font-semibold">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat._id || cat.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  to={`/services?category=${cat._id}`}
                  className="group flex flex-col items-center text-center gap-4 p-8 bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${cat.color || 'from-primary-500 to-indigo-600'} rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {cat.icon || '🛠️'}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-900 text-lg group-hover:text-primary-600 transition-colors mb-1">{cat.name}</h3>
                    <p className="text-xs text-slate-400 mb-2">{cat.description || 'Verified local services'}</p>
                    <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100">
                      {cat.servicesCount || 0}+ Services Available
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
