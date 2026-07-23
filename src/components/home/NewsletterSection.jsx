import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { HiMail, HiArrowRight } from 'react-icons/hi';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success('🎉 You\'ve subscribed! Welcome to the ServEase family.');
    setEmail('');
    setLoading(false);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 rounded-2xl mb-6">
            <HiMail className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">Stay in the Loop</h2>
          <p className="text-primary-100 text-lg mb-8">Get exclusive deals, new service alerts, and tips delivered to your inbox every week.</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-primary-200 outline-none focus:ring-2 focus:ring-white/50 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-all disabled:opacity-70 shadow-lg whitespace-nowrap text-sm"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Subscribe <HiArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
          <p className="text-primary-200 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
