import { motion } from 'framer-motion';
import { howItWorks } from '@/data/placeholderData';

const HowItWorks = () => (
  <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Simple Steps</span>
        <h2 className="font-display font-bold text-4xl text-slate-900 mt-2 mb-4">How It Works</h2>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">Get a professional service booked in under 3 minutes — it's that easy.</p>
      </motion.div>

      <div className="relative">
        {/* Connector Line (desktop) */}
        <div className="hidden lg:block absolute top-16 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 via-green-200 to-amber-200 z-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-xl group-hover:scale-110 transition-transform duration-300 relative`}>
                {step.icon}
                <span className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-white border-2 border-current rounded-full flex items-center justify-center text-xs font-bold text-slate-700 shadow-sm">
                  {step.step}
                </span>
              </div>
              <h3 className="font-display font-bold text-slate-900 text-xl mb-3">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
