import { motion } from 'framer-motion';
import { stats } from '@/data/placeholderData';

const StatsSection = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-100">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
            <div className={`font-display font-bold text-4xl lg:text-5xl ${stat.color} mb-2`}>{stat.value}</div>
            <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
