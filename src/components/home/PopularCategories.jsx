import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categoryApi } from '@/services/api.service';

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryApi.getAll().then((res) => {
      if (res.data?.success) setCategories(res.data.data.categories?.slice(0, 6) || []);
    }).catch(() => {});
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Explore</span>
          <h2 className="font-display font-bold text-4xl text-slate-900 mt-2 mb-4">Popular Categories</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Find professional services across every category, available at your doorstep.</p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat._id || cat.id || i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                to={`/services?category=${cat._id}`}
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-slate-100 hover:border-primary-200 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {cat.icon || '🛠️'}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-slate-800 text-sm group-hover:text-primary-600 transition-colors leading-tight">{cat.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{cat.servicesCount || 0}+ available</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:text-primary-600 hover:border-primary-200 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all"
          >
            Browse All Services →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
