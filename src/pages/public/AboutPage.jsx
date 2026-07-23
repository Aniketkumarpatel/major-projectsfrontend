import { motion } from 'framer-motion';
import { HiShieldCheck, HiStar, HiUsers, HiGlobe } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const team = [
  { name: 'Vikram Malhotra', role: 'CEO & Co-Founder', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram', bio: 'Former VP at OYO. Passionate about empowering local service professionals.' },
  { name: 'Sneha Kapoor', role: 'CTO & Co-Founder', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha', bio: 'Ex-Google engineer. Leads product engineering and AI matching algorithms.' },
  { name: 'Dev Anand', role: 'Head of Operations', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev', bio: 'Built operations teams at Swiggy & Dunzo. Ensures seamless service delivery.' },
  { name: 'Pooja Iyer', role: 'Head of Design', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja', bio: 'Award-winning designer with a passion for creating intuitive user experiences.' },
];

const milestones = [
  { year: '2020', event: 'ServEase Founded in Mumbai with 50 service providers' },
  { year: '2021', event: 'Expanded to 10 cities, crossed 100,000 bookings' },
  { year: '2022', event: 'Series A funding of ₹45 Cr. Launched AI-powered matching' },
  { year: '2023', event: 'Reached 500K+ providers and 50 cities. Launched mobile app' },
  { year: '2024', event: '1M+ bookings milestone. Expanded to 100+ cities across India' },
  { year: '2026', event: '2M+ bookings, 120+ cities, 50K+ providers and counting!' },
];

const AboutPage = () => (
  <div className="min-h-screen bg-slate-50">
    {/* Hero */}
    <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-slate-900 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block text-xs font-bold text-primary-300 uppercase tracking-widest bg-primary-500/20 border border-primary-500/30 px-4 py-2 rounded-full mb-6">Our Story</span>
          <h1 className="font-display font-bold text-5xl sm:text-6xl text-white mb-6 leading-tight">
            Connecting India's <span className="bg-gradient-to-r from-primary-300 to-cyan-300 bg-clip-text text-transparent">Best Talent</span> to Every Home
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            We started ServEase with a simple belief: everyone deserves access to quality, affordable local services — and every skilled professional deserves a platform to grow their business.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Mission */}
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Mission</span>
            <h2 className="font-display font-bold text-4xl text-slate-900 mt-2 mb-6">Building a Future Where Quality Service is for Everyone</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              At ServEase, we bridge the gap between skilled professionals and the customers who need them most. Our platform uses technology to create seamless connections that benefit both sides of the marketplace.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              We're committed to fair wages for providers, transparent prices for customers, and a platform that upholds safety, accountability, and trust at every step.
            </p>
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all">
              Explore Our Services →
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
            {[
              { icon: HiShieldCheck, title: 'Safety First', desc: 'Every provider is background-checked and ID-verified', color: 'bg-blue-50 text-blue-600 border-blue-100' },
              { icon: HiStar, title: 'Quality Assured', desc: '4.9/5 average rating across 2M+ services', color: 'bg-amber-50 text-amber-600 border-amber-100' },
              { icon: HiUsers, title: 'Community Driven', desc: '50K+ providers earning fair incomes', color: 'bg-green-50 text-green-600 border-green-100' },
              { icon: HiGlobe, title: 'Pan-India Reach', desc: 'Available across 120+ cities and growing', color: 'bg-purple-50 text-purple-600 border-purple-100' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className={`p-5 rounded-2xl border bg-white shadow-sm`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{title}</h3>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
          <h2 className="font-display font-bold text-4xl text-slate-900 mt-2">From Idea to Impact</h2>
        </motion.div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-200 via-primary-400 to-primary-200" />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary-200">
                  <span className="font-display font-bold text-white text-xs">{m.year}</span>
                </div>
                <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-5 mt-2">
                  <p className="text-slate-700 text-sm leading-relaxed">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">The People</span>
          <h2 className="font-display font-bold text-4xl text-slate-900 mt-2">Meet Our Leadership Team</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center bg-slate-50 rounded-2xl border border-slate-100 p-6 hover:shadow-card hover:bg-white transition-all duration-300"
            >
              <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-2xl mx-auto mb-4 border-2 border-slate-200 group-hover:border-primary-200 transition-colors bg-slate-100" />
              <h3 className="font-bold text-slate-900 text-base">{member.name}</h3>
              <p className="text-primary-600 text-xs font-semibold mb-2">{member.role}</p>
              <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;
