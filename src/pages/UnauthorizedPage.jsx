import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { HiLockClosed, HiHome, HiArrowLeft } from 'react-icons/hi';

const UnauthorizedPage = () => {
  const { user } = useAuth();

  const getDashboardPath = () => {
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'provider') return '/provider';
    return '/dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center text-white shadow-2xl"
      >
        <div className="w-20 h-20 bg-red-500/20 border border-red-500/30 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiLockClosed className="w-10 h-10" />
        </div>

        <h1 className="font-display font-bold text-3xl mb-2">403 - Access Denied</h1>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          You do not have permission to access this page. You are currently logged in as{' '}
          <span className="font-semibold text-primary-400 capitalize">{user?.role || 'Guest'}</span>.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={getDashboardPath()}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            <HiHome className="w-4 h-4" /> Go to My Dashboard
          </Link>
          <Link
            to="/"
            className="py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <HiArrowLeft className="w-4 h-4" /> Home Page
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;
