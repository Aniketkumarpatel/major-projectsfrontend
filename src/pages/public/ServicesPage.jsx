import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiSearch, HiStar, HiClock, HiCheckCircle } from 'react-icons/hi';
import { serviceApi, categoryApi } from '@/services/api.service';

const ServicesPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('rating');

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Categories
  useEffect(() => {
    categoryApi.getAll().then((res) => {
      if (res.data?.success) setCategories(res.data.data.categories || []);
    }).catch(() => {});
  }, []);

  // Fetch Services with Filters
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const params = { limit: 50 };
        if (query.trim()) params.search = query.trim();
        if (selectedCategory && selectedCategory !== 'All') params.category = selectedCategory;

        const res = await serviceApi.getAll(params);
        if (res.data?.success) {
          setServices(res.data.data.services || []);
        }
      } catch {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [query, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-900 to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-3">Explore Services</h1>
            <p className="text-slate-400 text-lg">Find the perfect verified professional for any task</p>
          </motion.div>
          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-2xl mx-auto">
            <div className="flex gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3">
              <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3">
                <HiSearch className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search services by title or description..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 text-slate-800 text-sm bg-transparent outline-none placeholder-slate-400"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white rounded-xl px-4 py-3 text-sm text-slate-700 border-none outline-none cursor-pointer"
              >
                <option value="rating">Top Rated</option>
                <option value="price_asc">Price: Low</option>
              </select>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar mb-8">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedCategory === 'All' ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300'}`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id || cat.id}
              onClick={() => setSelectedCategory(cat._id || cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${selectedCategory === (cat._id || cat.id) ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300'}`}
            >
              {cat.icon || '🛠️'} {cat.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600 font-medium">
            <span className="font-bold text-slate-900">{services.length}</span> services found
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-2">No services found</h3>
            <p className="text-slate-500">Try adjusting your search query or selected category filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service._id || service.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  to={`/services/${service._id || service.id}`}
                  className="group block bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="h-44 bg-gradient-to-br from-primary-600 to-indigo-700 relative flex items-center justify-center">
                    <span className="text-6xl opacity-30">{service.category?.icon || '🛠️'}</span>
                    {service.isFeatured && (
                      <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 bg-amber-400 text-slate-900 rounded-full shadow">Featured</span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-display font-bold text-slate-900 text-base group-hover:text-primary-600 transition-colors leading-tight">{service.title}</h3>
                      <span className="font-bold text-primary-600 text-base flex-shrink-0 ml-2">₹{service.price?.amount}</span>
                    </div>
                    <p className="text-sm text-primary-600 font-medium mb-2">{service.category?.name || 'Local Service'}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4">{service.description}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <HiStar className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold text-slate-700">{service.rating || 4.5}</span>
                        <span>({service.numReviews || 0})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <HiClock className="w-3.5 h-3.5" />
                        {service.duration || '1-2 hrs'}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center">
                        {service.provider?.businessName?.[0] || 'P'}
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="font-medium text-slate-700">{service.provider?.businessName || 'Verified Provider'}</span>
                        <HiCheckCircle className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                      <span className="ml-auto text-xs text-primary-600 font-semibold group-hover:underline">View Details →</span>
                    </div>
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

export default ServicesPage;
