import { useState, useEffect, memo } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiMenu, HiX, HiChevronDown, HiUser, HiLogout, HiSparkles,
} from 'react-icons/hi';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = memo(() => {
  const { user, isAuthenticated, switchRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleRoleChange = (role) => {
    switchRole(role);
    setShowRoleSelector(false);
    setIsOpen(false);
    if (role === 'customer') navigate('/dashboard');
    else if (role === 'provider') navigate('/provider');
    else if (role === 'admin') navigate('/admin');
    else navigate('/');
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-100' : 'bg-white/80 backdrop-blur-md border-b border-slate-100/50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-xl text-slate-900 tracking-tight group">
            <span className="bg-gradient-to-br from-primary-600 to-primary-500 text-white p-1.5 rounded-xl shadow-md shadow-primary-200 group-hover:shadow-primary-300 transition-shadow">
              <HiSparkles className="w-5 h-5" />
            </span>
            <span className="bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">ServEase</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                    ? 'text-primary-600 bg-primary-50 font-semibold'
                    : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-3">
            {/* Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowRoleSelector(!showRoleSelector)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Demo: <span className="capitalize font-bold text-amber-900">{user?.role || 'Guest'}</span>
                <HiChevronDown className="w-3.5 h-3.5" />
              </button>
              <AnimatePresence>
                {showRoleSelector && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowRoleSelector(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-slate-100 shadow-xl py-2 z-20"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Demo Role</div>
                      {[null, 'customer', 'provider', 'admin'].map((role) => (
                        <button
                          key={role ?? 'guest'}
                          onClick={() => handleRoleChange(role)}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-slate-50 flex items-center gap-2.5 ${(user?.role === role || (!user && !role)) ? 'text-primary-600 font-semibold bg-primary-50/50' : 'text-slate-600'}`}
                        >
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${role === null ? 'bg-slate-300' : role === 'customer' ? 'bg-primary-500' : role === 'provider' ? 'bg-green-500' : 'bg-purple-500'}`} />
                          {role === null ? 'Guest (Logged Out)' : role.charAt(0).toUpperCase() + role.slice(1) + ' Dashboard'}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to={user.role === 'admin' ? '/admin' : user.role === 'provider' ? '/provider' : '/dashboard'}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl shadow-md shadow-primary-200 hover:shadow-primary-300 hover:from-primary-700 hover:to-primary-600 transition-all"
                >
                  <HiUser className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Logout"
                >
                  <HiLogout className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-xl transition-all">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl shadow-md shadow-primary-200 hover:shadow-primary-300 hover:from-primary-700 hover:to-primary-600 transition-all">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-primary-600 hover:bg-slate-50 transition-all"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-100 bg-white/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-2 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive ? 'text-primary-600 bg-primary-50 font-semibold' : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'}`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            <div className="px-4 py-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Demo Role</span>
                <div className="flex gap-1.5">
                  {['customer', 'provider', 'admin'].map((role) => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-lg capitalize transition-all ${user?.role === role
                        ? role === 'customer' ? 'bg-primary-600 text-white' : role === 'provider' ? 'bg-green-600 text-white' : 'bg-purple-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to={user.role === 'admin' ? '/admin' : user.role === 'provider' ? '/provider' : '/dashboard'}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold text-sm shadow-md"
                  >
                    <HiUser className="w-4 h-4" /> Go to Dashboard
                  </Link>
                  <button
                    onClick={() => { logout(); setIsOpen(false); navigate('/'); }}
                    className="flex items-center justify-center gap-2 w-full py-3 border border-red-100 text-red-600 hover:bg-red-50 rounded-xl font-semibold text-sm transition-all"
                  >
                    <HiLogout className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold text-sm transition-all">
                    Sign In
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="flex items-center justify-center py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-semibold text-sm shadow-md">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
