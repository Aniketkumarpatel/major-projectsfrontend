import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMail, HiPhone, HiLocationMarker, HiClock, HiCheckCircle } from 'react-icons/hi';
import { contactApi } from '@/services/api.service';
import { toast } from 'react-hot-toast';

const contactInfo = [
  { icon: HiMail, title: 'Email Us', value: 'support@servease.com', sub: 'We reply within 24 hours', color: 'bg-blue-100 text-blue-600' },
  { icon: HiPhone, title: 'Call Us', value: '+91 (800) 123-4567', sub: 'Mon–Fri, 9am–6pm IST', color: 'bg-green-100 text-green-600' },
  { icon: HiLocationMarker, title: 'Visit Us', value: '100 Innovation Tower', sub: 'Mumbai, MH 400001', color: 'bg-purple-100 text-purple-600' },
  { icon: HiClock, title: 'Support Hours', value: '24/7 Support Desk', sub: 'Customer assistance', color: 'bg-amber-100 text-amber-600' },
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Feedback', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await contactApi.submit(form);
      if (res.data?.success) {
        toast.success(res.data.message || 'Message sent successfully!');
        setSent(true);
        setForm({ name: '', email: '', subject: 'General Feedback', message: '' });
      } else {
        toast.error(res.data?.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit inquiry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 to-slate-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold text-4xl sm:text-5xl text-white mb-3">Get in Touch</motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a question, complaint, or feedback? We're here to help. Our support team responds within 24 hours.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-card p-5"
            >
              <div className={`w-12 h-12 ${info.color} rounded-2xl flex items-center justify-center mb-4`}>
                <info.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{info.title}</h3>
              <p className="text-sm font-medium text-slate-700">{info.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{info.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HiCheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700 transition-all">
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display font-bold text-2xl text-slate-900 mb-1">Send Us a Message</h2>
                <p className="text-slate-500 text-sm mb-7">Fill in the form below and we'll be in touch shortly.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                      <input name="name" type="text" required value={form.name} onChange={handleChange} placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="john@example.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                    <select name="subject" required value={form.subject} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 cursor-pointer">
                      <option value="Booking Issue">Booking Issue</option>
                      <option value="Provider Complaint">Provider Complaint</option>
                      <option value="Refund Request">Refund Request</option>
                      <option value="Partnership Inquiry">Partnership Inquiry</option>
                      <option value="General Feedback">General Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea name="message" required value={form.message} onChange={handleChange} rows={5} placeholder="Describe your inquiry in detail..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none" />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:from-primary-700 hover:to-primary-600 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</> : 'Send Message →'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
