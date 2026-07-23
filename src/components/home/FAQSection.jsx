import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { faqApi } from '@/services/api.service';

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="border border-slate-200 rounded-2xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
    >
      <span className="font-semibold text-slate-900 text-base pr-4">{faq.question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0"
      >
        <HiChevronDown className={`w-5 h-5 ${isOpen ? 'text-primary-600' : 'text-slate-400'}`} />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <div className="px-6 pb-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
            {faq.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQSection = ({ limit }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const res = await faqApi.getAll();
        if (res.data?.success) {
          setFaqs(res.data.data.faqs || []);
        }
      } catch {
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const displayFaqs = limit ? faqs.slice(0, limit) : faqs;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="faq">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Got Questions?</span>
          <h2 className="font-display font-bold text-4xl text-slate-900 mt-2 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 text-lg">Everything you need to know about ServEase. Can't find an answer? Contact our support team.</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayFaqs.length === 0 ? (
          <p className="text-center text-slate-400 py-8">No FAQs available at the moment.</p>
        ) : (
          <div className="space-y-3">
            {displayFaqs.map((faq, i) => (
              <motion.div
                key={faq._id || faq.id || i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <FAQItem
                  faq={faq}
                  isOpen={openId === (faq._id || faq.id || i)}
                  onToggle={() => setOpenId(openId === (faq._id || faq.id || i) ? null : (faq._id || faq.id || i))}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
