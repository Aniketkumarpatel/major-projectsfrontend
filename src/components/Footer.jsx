import { memo } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { HiSparkles, HiEnvelope, HiPhone, HiMapPin } from 'react-icons/hi2';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = memo(() => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      toast.success('Thank you for subscribing! Check your inbox for updates.');
      e.target.reset();
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Newsletter Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-display font-bold text-white mb-2">Subscribe to our newsletter</h3>
            <p className="text-slate-400 text-sm">Get weekly updates on new services, local providers, and exclusive platform discounts.</p>
          </div>
          <div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-slate-850 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-slate-500"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-all shadow-lg shadow-primary-900/20 whitespace-nowrap cursor-pointer"
              >
                Join Now
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-2xl text-white tracking-tight">
              <span className="bg-primary-600 text-white p-2 rounded-xl shadow-md">
                <HiSparkles className="w-5 h-5" />
              </span>
              <span>ServEase</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted partner for home maintenance, cleaning, tutoring, and professional local services. Book verified experts in minutes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary-600 hover:text-white rounded-xl transition-all duration-200">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary-600 hover:text-white rounded-xl transition-all duration-200">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary-600 hover:text-white rounded-xl transition-all duration-200">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary-600 hover:text-white rounded-xl transition-all duration-200">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary-400 transition-colors">Explore Services</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">About ServEase</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Support</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary-400 transition-colors">FAQs & Help</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Portals & Roles */}
          <div>
            <h4 className="font-display font-bold text-white text-base mb-6">User Dashboards</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/dashboard" className="hover:text-primary-400 transition-colors">Customer Portal</Link>
              </li>
              <li>
                <Link to="/provider" className="hover:text-primary-400 transition-colors">Service Provider Panel</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-primary-400 transition-colors">System Admin Console</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary-400 transition-colors">Account Sign In</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary-400 transition-colors">Become a Provider</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-base mb-6">Get in Touch</h4>
            <div className="flex items-start gap-3 text-sm">
              <HiMapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
              <span className="text-slate-400">100 Innovation Way, Suite 400, Tech City, TC 94016</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <HiPhone className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <span className="text-slate-400">+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <HiEnvelope className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <span className="text-slate-400">support@servease.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} ServEase Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
