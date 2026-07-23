import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { HiUser, HiMail, HiPhone, HiLocationMarker, HiBell, HiShieldCheck } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

const ProviderSettingsPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    newBooking: true,
    cancellation: true,
    payment: true,
    review: false,
    marketing: false,
  });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 600));
    toast.success('Profile settings saved!');
  };

  const toggleNotif = (key) => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display font-bold text-2xl text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Configure your provider account and preferences</p>
      </div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <h2 className="font-display font-bold text-slate-900 text-lg mb-5">Business Profile</h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Display Name</label>
              <div className="relative"><HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" defaultValue={user?.name} className="input pl-10" /></div>
            </div>
            <div>
              <label className="label">Email</label>
              <div className="relative"><HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="email" defaultValue={user?.email} className="input pl-10" /></div>
            </div>
            <div>
              <label className="label">Phone Number</label>
              <div className="relative"><HiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="tel" defaultValue="+91 98765 43210" className="input pl-10" /></div>
            </div>
            <div>
              <label className="label">Service Area</label>
              <div className="relative"><HiLocationMarker className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" defaultValue="Mumbai, 10 km radius" className="input pl-10" /></div>
            </div>
          </div>
          <div>
            <label className="label">Professional Bio</label>
            <textarea rows={3} defaultValue="Experienced home cleaning specialist with 5+ years of expertise. Committed to quality and punctuality." className="input resize-none" />
          </div>
          <div>
            <label className="label">Hourly Rate</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
              <input type="number" defaultValue="499" className="input pl-8 w-40" />
              <span className="ml-3 text-slate-400 text-sm">/hr</span>
            </div>
          </div>
          <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all">
            Save Profile
          </button>
        </form>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <div className="flex items-center gap-2 mb-5">
          <HiBell className="w-5 h-5 text-slate-700" />
          <h2 className="font-display font-bold text-slate-900 text-lg">Notification Preferences</h2>
        </div>
        <div className="space-y-4">
          {Object.entries({
            newBooking: 'New booking requests',
            cancellation: 'Booking cancellations',
            payment: 'Payment confirmations',
            review: 'New customer reviews',
            marketing: 'Marketing & promotional emails',
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between py-2">
              <p className="text-sm font-medium text-slate-700">{label}</p>
              <button
                onClick={() => toggleNotif(key)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${notifications[key] ? 'bg-green-500' : 'bg-slate-200'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${notifications[key] ? 'translate-x-5' : ''}`} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-red-50 rounded-2xl border border-red-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <HiShieldCheck className="w-5 h-5 text-red-600" />
          <h2 className="font-display font-bold text-red-900 text-lg">Danger Zone</h2>
        </div>
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-red-200">
          <div>
            <p className="font-semibold text-red-900 text-sm">Deactivate Provider Account</p>
            <p className="text-xs text-red-400 mt-0.5">This will remove you from search results and stop new bookings.</p>
          </div>
          <button className="px-4 py-2 text-xs font-bold text-red-600 border border-red-300 rounded-lg hover:bg-red-100 transition-all">Deactivate</button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProviderSettingsPage;
