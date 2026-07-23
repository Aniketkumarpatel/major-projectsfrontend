import { motion } from 'framer-motion';
import { whyChooseUs } from '@/data/placeholderData';

const WhyChooseUs = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-primary-950 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />

    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">Our Promise</span>
        <h2 className="font-display font-bold text-4xl text-white mt-2 mb-4">Why Choose ServEase?</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">We've built a platform that puts safety, quality, and convenience first — every single time.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {whyChooseUs.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
          >
            <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {item.icon}
            </div>
            <h3 className="font-display font-bold text-white text-lg mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
