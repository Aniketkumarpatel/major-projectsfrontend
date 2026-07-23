import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { HiUser, HiMail, HiPhone, HiLocationMarker, HiCamera, HiCheck } from 'react-icons/hi';
import { toast } from 'react-hot-toast';

const CustomerProfilePage = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    bio: 'I love using ServEase for all my home service needs!',
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUser({ ...user, name: form.name, email: form.email });
    setSaved(true);
    setLoading(false);
    toast.success('Profile updated successfully!');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display font-bold text-2xl text-slate-900">My Profile</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your personal information and preferences</p>
      </div>

      {/* Avatar */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-2xl border-4 border-primary-100 bg-slate-100" />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-all">
              <HiCamera className="w-4 h-4 text-white" />
            </button>
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-900 text-xl">{user?.name}</h3>
            <p className="text-primary-600 text-sm font-medium capitalize">{user?.role} Account</p>
            <p className="text-slate-400 text-xs mt-1">{user?.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <h2 className="font-display font-bold text-slate-900 text-lg mb-6">Personal Information</h2>
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input name="name" type="text" value={form.name} onChange={handleChange} className="input pl-10" required />
              </div>
            </div>
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <HiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input name="email" type="email" value={form.email} onChange={handleChange} className="input pl-10" required />
              </div>
            </div>
            <div>
              <label className="label">Phone Number</label>
              <div className="relative">
                <HiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="input pl-10" />
              </div>
            </div>
            <div>
              <label className="label">City</label>
              <div className="relative">
                <HiLocationMarker className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input name="city" type="text" value={form.city} onChange={handleChange} className="input pl-10" />
              </div>
            </div>
          </div>
          <div>
            <label className="label">Short Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className="input resize-none" />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all disabled:opacity-60"
            >
              {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</> : saved ? <><HiCheck className="w-4 h-4" />Saved!</> : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Security Section */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-slate-100 shadow-card p-6">
        <h2 className="font-display font-bold text-slate-900 text-lg mb-4">Security</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="font-semibold text-slate-900 text-sm">Password</p>
              <p className="text-xs text-slate-400">Last changed 30 days ago</p>
            </div>
            <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline">Change</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="font-semibold text-slate-900 text-sm">Two-Factor Auth</p>
              <p className="text-xs text-slate-400">Currently disabled</p>
            </div>
            <button className="text-sm font-semibold text-green-600 hover:text-green-700 hover:underline">Enable</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerProfilePage;
