import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMail, HiArrowLeft } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
    toast.success('Reset link sent! Check your inbox.');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <HiMail className="w-8 h-8 text-primary-300" />
        </div>
        <h1 className="font-display font-bold text-3xl text-white mb-2">Forgot Password?</h1>
        <p className="text-slate-400 text-sm">Enter your email and we'll send a reset link</p>
      </div>

      {sent ? (
        <div className="text-center">
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl mb-6">
            <p className="text-green-300 text-sm">✅ Reset email sent to <strong>{email}</strong>. Check your inbox (and spam folder).</p>
          </div>
          <Link to="/login" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors text-sm flex items-center justify-center gap-2">
            <HiArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</> : 'Send Reset Link'}
          </button>
          <Link to="/login" className="block text-center text-sm text-slate-400 hover:text-slate-300 transition-colors mt-2 flex items-center justify-center gap-1">
            <HiArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </form>
      )}
    </motion.div>
  );
};

export default ForgotPasswordPage;
