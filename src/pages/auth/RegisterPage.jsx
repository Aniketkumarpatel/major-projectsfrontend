import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { HiMail, HiLockClosed, HiUser, HiEye, HiEyeOff } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    try {
      const user = await register(form);
      toast.success(`Account created! Welcome, ${user.name}! 🎉`);
      if (user.role === 'provider') navigate('/provider');
      else navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl text-white mb-2">Create an Account</h1>
        <p className="text-slate-400 text-sm">Join 1.8M+ users on ServEase today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
          <div className="relative">
            <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input name="name" type="text" required value={form.name} onChange={handleChange} placeholder="John Doe" className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
          <div className="relative">
            <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
          <div className="relative">
            <HiLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input name="password" type={showPass ? 'text' : 'password'} required value={form.password} onChange={handleChange} placeholder="Min. 6 characters" className="w-full pl-11 pr-11 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300">
              {showPass ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">I want to...</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: 'customer', label: '🛒 Book Services', desc: 'Find & hire professionals' },
              { value: 'provider', label: '🔧 Offer Services', desc: 'Grow my service business' },
            ].map(({ value, label, desc }) => (
              <label
                key={value}
                className={`cursor-pointer p-3 rounded-xl border-2 transition-all ${form.role === value ? 'border-primary-400 bg-primary-500/20' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
              >
                <input type="radio" name="role" value={value} checked={form.role === value} onChange={handleChange} className="sr-only" />
                <p className="text-sm font-semibold text-white mb-0.5">{label}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </label>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-primary-400 hover:underline">Terms of Service</a> and{' '}
          <a href="#" className="text-primary-400 hover:underline">Privacy Policy</a>.
        </p>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-900/50 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isLoading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Creating account...</> : 'Create Account →'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors">Sign in</Link>
      </p>
    </motion.div>
  );
};

export default RegisterPage;
