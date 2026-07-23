import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiSparkles, HiHome, HiCalendar, HiUser, HiLogout, HiMenu, HiX,
  HiCollection, HiClipboardList, HiCog, HiChartBar, HiUsers, HiShieldCheck,
  HiBell, HiChevronDown, HiStar, HiCurrencyRupee, HiChartPie,
} from 'react-icons/hi';

const navConfig = {
  customer: [
    { label: 'Dashboard', path: '/dashboard', icon: HiHome },
    { label: 'My Bookings', path: '/dashboard/bookings', icon: HiCalendar },
    { label: 'My Reviews', path: '/dashboard/reviews', icon: HiStar },
    { label: 'Notifications', path: '/dashboard/notifications', icon: HiBell },
    { label: 'Book Service', path: '/booking', icon: HiCollection },
    { label: 'Profile', path: '/dashboard/profile', icon: HiUser },
  ],
  provider: [
    { label: 'Dashboard', path: '/provider', icon: HiChartBar },
    { label: 'My Bookings', path: '/provider/bookings', icon: HiCalendar },
    { label: 'My Services', path: '/provider/services', icon: HiCollection },
    { label: 'Earnings', path: '/provider/earnings', icon: HiCurrencyRupee },
    { label: 'Notifications', path: '/provider/notifications', icon: HiBell },
    { label: 'Settings', path: '/provider/settings', icon: HiCog },
  ],
  admin: [
    { label: 'Dashboard', path: '/admin', icon: HiChartBar },
    { label: 'Analytics', path: '/admin/analytics', icon: HiChartPie },
    { label: 'Users', path: '/admin/users', icon: HiUsers },
    { label: 'Provider Approvals', path: '/admin/providers', icon: HiShieldCheck },
    { label: 'Services', path: '/admin/services', icon: HiCollection },
    { label: 'Bookings', path: '/admin/bookings', icon: HiClipboardList },
    { label: 'Categories', path: '/admin/categories', icon: HiShieldCheck },
    { label: 'Notifications', path: '/admin/notifications', icon: HiBell },
  ],
};

const roleColors = {
  customer: 'from-primary-600 to-primary-500',
  provider: 'from-green-600 to-emerald-500',
  admin: 'from-purple-600 to-violet-500',
};

const DashboardLayout = ({ role }) => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const links = navConfig[role] || navConfig.customer;
  const gradient = roleColors[role] || roleColors.customer;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800/50">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-xl text-white">
          <span className={`bg-gradient-to-br ${gradient} p-1.5 rounded-xl shadow-lg`}>
            <HiSparkles className="w-5 h-5 text-white" />
          </span>
          ServEase
        </Link>
        <div className="mt-3 flex items-center gap-1.5">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${gradient} text-white capitalize`}>{role}</span>
          <span className="text-xs text-slate-400">Portal</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/dashboard' || path === '/provider' || path === '/admin'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-slate-800/50">
        <div className="flex items-center gap-3 mb-3 px-2">
          <img
            src={user?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`}
            alt={user?.name}
            className="w-9 h-9 rounded-full border-2 border-slate-700 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
        >
          <HiLogout className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-64 bg-slate-900 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-100 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-primary-600 hover:bg-slate-50 transition-all"
            >
              <HiMenu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-display font-bold text-slate-900 text-base capitalize">{role} Portal</h1>
              <p className="text-xs text-slate-400 hidden sm:block">Manage your {role} account</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
              <HiBell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`}
                alt={user?.name}
                className="w-8 h-8 rounded-full border border-slate-200"
              />
              <span className="text-sm font-medium text-slate-700 hidden sm:block">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
