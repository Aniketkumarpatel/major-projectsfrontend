import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  const from = location.state?.from?.pathname;

  const redirectUser = (user) => {
    if (from) {
      navigate(from, { replace: true });
      return;
    }
    if (user.role === 'admin') navigate('/admin', { replace: true });
    else if (user.role === 'provider') navigate('/provider', { replace: true });
    else navigate('/dashboard', { replace: true });
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form);
      toast.success(`Welcome back, ${user.name}! 👋`);
      redirectUser(user);
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const quickLogin = async (role) => {
    let email = 'customer1@example.com';
    if (role === 'admin') email = 'admin@servease.com';
    else if (role === 'provider') email = 'provider1@example.com';

    try {
      const user = await login({ email, password: 'password123' });
      toast.success(`Logged in as ${user.name}!`);
      redirectUser(user);
    } catch (err) {
      toast.error(err.message || 'Quick login failed.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl text-white mb-2">Welcome Back</h1>
        <p className="text-slate-400 text-sm">Sign in to your ServEase account</p>
      </div>

      {/* Quick Login */}
      <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3 text-center">Quick Demo Login</p>
        <div className="grid grid-cols-3 gap-2">
          {['customer', 'provider', 'admin'].map((role) => (
            <button
              key={role}
              onClick={() => quickLogin(role)}
              disabled={isLoading}
              className="py-2 text-xs font-bold rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all capitalize border border-white/10 hover:border-white/20 disabled:opacity-50"
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-slate-500 text-xs">or sign in with email</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
          <div className="relative">
            <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <Link to="/forgot-password" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type={showPass ? 'text' : 'password'}
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300">
              {showPass ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-900/50 transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
        >
          {isLoading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in...</> : 'Sign In →'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">
          Create one free
        </Link>
      </p>
    </motion.div>
  );
};

export default LoginPage;
