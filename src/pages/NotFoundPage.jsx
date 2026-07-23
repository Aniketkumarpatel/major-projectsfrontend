import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiHome, HiSearch, HiArrowLeft } from 'react-icons/hi';

const NotFoundPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
    {/* Background blobs */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

    <div className="relative z-10">
      {/* 404 Number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
        className="font-display font-bold text-[10rem] sm:text-[14rem] leading-none bg-gradient-to-br from-primary-300 via-cyan-300 to-primary-400 bg-clip-text text-transparent select-none"
      >
        404
      </motion.div>

      {/* Icon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-6xl mb-6 -mt-6"
      >
        🔍
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-900/50 transition-all"
        >
          <HiHome className="w-5 h-5" />
          Go to Homepage
        </Link>
        <Link
          to="/services"
          className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
        >
          <HiSearch className="w-5 h-5" />
          Browse Services
        </Link>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
      >
        {[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'About', to: '/about' },
          { label: 'Contact', to: '/contact' },
          { label: 'FAQ', to: '/faq' },
        ].map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className="text-slate-400 hover:text-white text-sm transition-colors hover:underline"
          >
            {label}
          </Link>
        ))}
      </motion.div>
    </div>
  </div>
);

export default NotFoundPage;
