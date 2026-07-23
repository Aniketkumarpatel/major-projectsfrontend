import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiStar, HiCheckCircle, HiLocationMarker, HiCalendar, HiBadgeCheck } from 'react-icons/hi';
import { providers, services } from '@/data/placeholderData';

const ProviderProfilePage = () => {
  const { id } = useParams();
  const provider = providers.find((p) => p.id === Number(id)) || providers[0];
  const providerServices = services.filter((s) => s.category === provider.category);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="h-52 bg-gradient-to-br from-primary-800 via-primary-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-8">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-28 h-28 rounded-2xl border-4 border-white shadow-xl bg-slate-100 flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="font-display font-bold text-3xl text-slate-900">{provider.name}</h1>
                  {provider.verified && (
                    <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full border border-blue-200">
                      <HiBadgeCheck className="w-4 h-4" /> Verified
                    </span>
                  )}
                  <span className={`${provider.badgeColor} text-xs font-bold px-3 py-1 rounded-full border border-current/20`}>{provider.badge}</span>
                </div>
                <p className="text-primary-600 font-semibold mb-2">{provider.category} Expert</p>
                <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <HiStar className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-slate-700">{provider.rating}</span>
                    <span>({provider.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiLocationMarker className="w-4 h-4" />
                    {provider.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <HiCalendar className="w-4 h-4" />
                    {provider.completedJobs} jobs completed
                  </div>
                </div>
              </div>
              <div className="sm:text-right">
                <p className="text-3xl font-display font-bold text-slate-900">{provider.price}</p>
                <p className="text-sm text-slate-400 mb-3">Starting rate</p>
                <Link to="/booking" className="inline-block px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
              <h2 className="font-display font-bold text-slate-900 text-xl mb-4">About {provider.name}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {provider.name} is a highly rated {provider.category} specialist with over {Math.floor(provider.completedJobs / 100) * 2} years of experience.
                Known for delivering exceptional quality and arriving on time, {provider.name} has earned a trusted reputation
                across {provider.location} and surrounding areas. Their commitment to customer satisfaction and professional workmanship
                sets them apart from the competition.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
              <h2 className="font-display font-bold text-slate-900 text-xl mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {provider.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-xl text-sm font-semibold border border-primary-100">
                    <HiCheckCircle className="w-4 h-4" /> {skill}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Services Offered */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
              <h2 className="font-display font-bold text-slate-900 text-xl mb-4">Services Offered</h2>
              <div className="space-y-3">
                {providerServices.length > 0 ? providerServices.map((s) => (
                  <Link key={s.id} to={`/services/${s.id}`} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-primary-50 border border-slate-100 hover:border-primary-200 transition-all group">
                    <div>
                      <p className="font-semibold text-slate-900 group-hover:text-primary-600 text-sm">{s.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.duration}</p>
                    </div>
                    <span className="font-bold text-primary-600 text-sm">{s.price}</span>
                  </Link>
                )) : (
                  <p className="text-slate-400 text-sm">No services listed yet.</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
              <h3 className="font-display font-bold text-slate-900 text-lg mb-4">Provider Stats</h3>
              <div className="space-y-4">
                {[
                  { label: 'Rating', value: `${provider.rating} / 5`, color: 'text-amber-600' },
                  { label: 'Reviews', value: provider.reviews, color: 'text-blue-600' },
                  { label: 'Jobs Completed', value: provider.completedJobs, color: 'text-green-600' },
                  { label: 'Response Time', value: '< 1 hour', color: 'text-purple-600' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">{label}</span>
                    <span className={`text-sm font-bold ${color}`}>{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-primary-600 to-primary-500 rounded-2xl p-6 text-white">
              <h3 className="font-display font-bold text-xl mb-2">Book {provider.name}</h3>
              <p className="text-primary-100 text-sm mb-5">Available today · {provider.price}</p>
              <Link to="/booking" className="block w-full text-center py-3 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-all shadow-md">
                Schedule a Booking
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfilePage;
