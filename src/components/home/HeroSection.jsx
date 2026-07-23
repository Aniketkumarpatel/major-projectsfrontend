import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiSearch, HiLocationMarker, HiArrowRight } from 'react-icons/hi';
import { FaStar, FaShieldAlt, FaClock } from 'react-icons/fa';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/services?q=${query}&location=${location}`);
  };

  const quickSearches = ['Home Cleaning', 'Plumber', 'Electrician', 'Tutor', 'Painter'];

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium text-white/90 mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Trusted by 1.8M+ happy customers across India
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
          >
            Local Services,{' '}
            <span className="bg-gradient-to-r from-primary-300 via-cyan-300 to-primary-300 bg-clip-text text-transparent">
              Delivered Instantly
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Book verified, background-checked professionals for cleaning, repairs, tutoring, beauty services and more — all at transparent prices.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-2xl mx-auto"
            >
              <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3">
                <HiSearch className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="What service do you need?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 text-slate-800 placeholder-slate-400 text-sm bg-transparent outline-none"
                />
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 sm:w-44">
                <HiLocationMarker className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Your city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 text-slate-800 placeholder-slate-400 text-sm bg-transparent outline-none w-full"
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-900/50 transition-all whitespace-nowrap"
              >
                <HiSearch className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>
          </motion.div>

          {/* Quick Searches */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-14"
          >
            <span className="text-slate-400 text-sm">Popular:</span>
            {quickSearches.map((s) => (
              <button
                key={s}
                onClick={() => navigate(`/services?q=${s}`)}
                className="px-3 py-1.5 text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 rounded-full transition-all"
              >
                {s}
              </button>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
          >
            {[
              { icon: FaShieldAlt, label: 'Verified Providers', color: 'text-green-400' },
              { icon: FaStar, label: '4.9 Avg Rating', color: 'text-amber-400' },
              { icon: FaClock, label: 'On-Time Guarantee', color: 'text-blue-400' },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-sm text-slate-300 font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80H1440V40C1440 40 1080 0 720 0C360 0 0 40 0 40V80Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
