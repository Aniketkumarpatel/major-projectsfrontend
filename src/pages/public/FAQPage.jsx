import { motion } from 'framer-motion';
import FAQSection from '@/components/home/FAQSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import { Link } from 'react-router-dom';

const FAQPage = () => (
  <div className="min-h-screen bg-white">
    {/* Hero */}
    <div className="bg-gradient-to-br from-primary-900 to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl sm:text-5xl text-white mb-3">
          Frequently Asked Questions
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-slate-400 text-lg">
          Everything you need to know about ServEase. Still confused? Contact our support team.
        </motion.p>
      </div>
    </div>

    <FAQSection />

    {/* Still Need Help CTA */}
    <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-4xl mb-4">🤝</div>
        <h2 className="font-display font-bold text-2xl text-slate-900 mb-3">Still Have Questions?</h2>
        <p className="text-slate-500 mb-6">Our support team is available 24/7 to help you with any questions or concerns.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/contact" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-md">
            Contact Support
          </Link>
          <a href="mailto:support@servease.com" className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:border-primary-300 hover:text-primary-600 transition-all">
            Email Us Directly
          </a>
        </div>
      </div>
    </div>

    <NewsletterSection />
  </div>
);

export default FAQPage;
