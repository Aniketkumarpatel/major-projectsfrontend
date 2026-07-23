import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiStar, HiCheckCircle, HiLocationMarker } from 'react-icons/hi';
import { serviceApi } from '@/services/api.service';

const FeaturedProviders = () => {
  const [featuredServices, setFeaturedServices] = useState([]);

  useEffect(() => {
    serviceApi.getAll({ limit: 3 }).then((res) => {
      if (res.data?.success) {
        setFeaturedServices(res.data.data.services || []);
      }
    }).catch(() => {});
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Top Talent</span>
          <h2 className="font-display font-bold text-4xl text-slate-900 mt-2 mb-4">Featured Services & Providers</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Hand-picked, highly rated professionals trusted by thousands of customers.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service, i) => (
            <motion.div
              key={service._id || service.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/services/${service._id || service.id}`}
                className="group block bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="h-28 bg-gradient-to-br from-primary-600 via-primary-500 to-indigo-600 relative flex items-center justify-center">
                  <span className="text-5xl opacity-30 text-white">{service.category?.icon || '🛠️'}</span>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex items-end justify-between -mt-10 mb-4">
                    <div className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg bg-primary-100 text-primary-700 font-bold text-xl flex items-center justify-center">
                      {service.provider?.businessName?.[0] || 'P'}
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                      Verified Provider
                    </span>
                  </div>

                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-display font-bold text-slate-900 text-lg group-hover:text-primary-600 transition-colors flex items-center gap-1.5">
                        {service.title}
                      </h3>
                      <p className="text-sm text-primary-600 font-medium">{service.category?.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 text-base">₹{service.price?.amount}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <HiStar className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-slate-700">{service.rating || 4.5}</span>
                      <span>({service.numReviews || 0})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiLocationMarker className="w-4 h-4 text-slate-400" />
                      {service.location?.city || 'Mumbai'}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{service.provider?.businessName || 'Verified Expert'}</span>
                    <span className="text-xs font-semibold text-primary-600 group-hover:underline">View Service →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-md shadow-primary-200 hover:shadow-lg hover:from-primary-700 hover:to-primary-600 transition-all"
          >
            Find More Services & Providers →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;
