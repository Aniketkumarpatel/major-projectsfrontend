import { useRef } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { testimonials } from '@/data/placeholderData';

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <HiStar key={s} className={`w-4 h-4 ${s <= rating ? 'text-amber-400' : 'text-slate-200'}`} />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 360, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Reviews</span>
            <h2 className="font-display font-bold text-4xl text-slate-900 mt-1">What Our Customers Say</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="p-2.5 bg-white border border-slate-200 rounded-xl hover:border-primary-300 hover:text-primary-600 transition-all shadow-sm"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="p-2.5 bg-white border border-slate-200 rounded-xl hover:border-primary-300 hover:text-primary-600 transition-all shadow-sm"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Scrollable Testimonials */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 no-scrollbar"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex-shrink-0 w-80 sm:w-96 bg-white rounded-2xl border border-slate-100 shadow-card p-6"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-primary-100 bg-slate-100" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
                <StarRating rating={t.rating} />
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">"{t.comment}"</p>
              <div className="inline-block text-xs font-medium px-3 py-1 bg-primary-50 text-primary-700 rounded-full border border-primary-100">
                {t.service}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
