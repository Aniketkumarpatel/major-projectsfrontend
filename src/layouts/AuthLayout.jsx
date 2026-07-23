import { Outlet, Link } from 'react-router-dom';
import { HiSparkles } from 'react-icons/hi';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 font-display font-bold text-2xl text-white mb-8 relative z-10 group">
        <span className="bg-gradient-to-br from-primary-400 to-primary-600 p-2 rounded-xl shadow-lg shadow-primary-900/50 group-hover:shadow-primary-700/50 transition-shadow">
          <HiSparkles className="w-5 h-5 text-white" />
        </span>
        ServEase
      </Link>

      {/* Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
          <Outlet />
        </div>
      </div>

      <p className="mt-6 text-slate-400 text-sm relative z-10">
        © {new Date().getFullYear()} ServEase Inc. All rights reserved.
      </p>
    </div>
  );
};

export default AuthLayout;
