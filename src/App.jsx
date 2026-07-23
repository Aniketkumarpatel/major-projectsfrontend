import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ── Layouts ───────────────────────────────────────────────────────────────
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';

// ── Guards ────────────────────────────────────────────────────────────────
import PrivateRoute from '@/components/guards/PrivateRoute';
import RoleRoute from '@/components/guards/RoleRoute';
import GuestRoute from '@/components/guards/GuestRoute';

// ── Lazy Loaded Public Pages ──────────────────────────────────────────────
const HomePage = lazy(() => import('@/pages/public/HomePage'));
const ServicesPage = lazy(() => import('@/pages/public/ServicesPage'));
const ServiceDetailPage = lazy(() => import('@/pages/public/ServiceDetailPage'));
const ProviderProfilePage = lazy(() => import('@/pages/public/ProviderProfilePage'));
const CategoriesPage = lazy(() => import('@/pages/public/CategoriesPage'));
const AboutPage = lazy(() => import('@/pages/public/AboutPage'));
const ContactPage = lazy(() => import('@/pages/public/ContactPage'));
const FAQPage = lazy(() => import('@/pages/public/FAQPage'));

// ── Lazy Loaded Auth Pages ────────────────────────────────────────────────
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'));

// ── Lazy Loaded Customer Dashboard ───────────────────────────────────────
const CustomerDashboard = lazy(() => import('@/pages/dashboard/customer/CustomerDashboard'));
const MyBookingsPage = lazy(() => import('@/pages/dashboard/customer/MyBookingsPage'));
const CustomerProfilePage = lazy(() => import('@/pages/dashboard/customer/CustomerProfilePage'));
const CustomerReviewsPage = lazy(() => import('@/pages/dashboard/customer/CustomerReviewsPage'));

// ── Lazy Loaded Provider Dashboard ───────────────────────────────────────
const ProviderDashboard = lazy(() => import('@/pages/dashboard/provider/ProviderDashboard'));
const ManageServicesPage = lazy(() => import('@/pages/dashboard/provider/ManageServicesPage'));
const ProviderBookingsPage = lazy(() => import('@/pages/dashboard/provider/ProviderBookingsPage'));
const ProviderSettingsPage = lazy(() => import('@/pages/dashboard/provider/ProviderSettingsPage'));
const ProviderEarningsPage = lazy(() => import('@/pages/dashboard/provider/ProviderEarningsPage'));

// ── Lazy Loaded Admin Dashboard ──────────────────────────────────────────
const AdminDashboard = lazy(() => import('@/pages/dashboard/admin/AdminDashboard'));
const AdminUsersPage = lazy(() => import('@/pages/dashboard/admin/AdminUsersPage'));
const AdminServicesPage = lazy(() => import('@/pages/dashboard/admin/AdminServicesPage'));
const AdminBookingsPage = lazy(() => import('@/pages/dashboard/admin/AdminBookingsPage'));
const AdminCategoriesPage = lazy(() => import('@/pages/dashboard/admin/AdminCategoriesPage'));
const AdminAnalyticsPage = lazy(() => import('@/pages/dashboard/admin/AdminAnalyticsPage'));
const AdminProvidersPage = lazy(() => import('@/pages/dashboard/admin/AdminProvidersPage'));

// ── Lazy Loaded Standalone Pages ─────────────────────────────────────────
const BookingPage = lazy(() => import('@/pages/BookingPage'));
const NotificationsPage = lazy(() => import('@/pages/dashboard/NotificationsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('@/pages/UnauthorizedPage'));

// ── Page Loading Fallback Spinner ─────────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="w-10 h-10 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Public routes ──────────────────────────────────────────────── */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/providers/:id" element={<ProviderProfilePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Route>

        {/* ── Guest routes ───────────────────────────────────────────────── */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          </Route>
        </Route>

        {/* ── Protected Booking Route ────────────────────────────────────── */}
        <Route element={<PrivateRoute />}>
          <Route path="/booking" element={<BookingPage />} />
        </Route>

        {/* ── Customer routes ────────────────────────────────────────────── */}
        <Route element={<RoleRoute allowedRoles={['customer']} />}>
          <Route element={<DashboardLayout role="customer" />}>
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/dashboard/bookings" element={<MyBookingsPage />} />
            <Route path="/dashboard/profile" element={<CustomerProfilePage />} />
            <Route path="/dashboard/reviews" element={<CustomerReviewsPage />} />
            <Route path="/dashboard/notifications" element={<NotificationsPage />} />
          </Route>
        </Route>

        {/* ── Provider routes ────────────────────────────────────────────── */}
        <Route element={<RoleRoute allowedRoles={['provider']} />}>
          <Route element={<DashboardLayout role="provider" />}>
            <Route path="/provider" element={<ProviderDashboard />} />
            <Route path="/provider/services" element={<ManageServicesPage />} />
            <Route path="/provider/bookings" element={<ProviderBookingsPage />} />
            <Route path="/provider/earnings" element={<ProviderEarningsPage />} />
            <Route path="/provider/notifications" element={<NotificationsPage />} />
            <Route path="/provider/settings" element={<ProviderSettingsPage />} />
          </Route>
        </Route>

        {/* ── Admin routes ───────────────────────────────────────────────── */}
        <Route element={<RoleRoute allowedRoles={['admin']} />}>
          <Route element={<DashboardLayout role="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/services" element={<AdminServicesPage />} />
            <Route path="/admin/bookings" element={<AdminBookingsPage />} />
            <Route path="/admin/categories" element={<AdminCategoriesPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="/admin/providers" element={<AdminProvidersPage />} />
            <Route path="/admin/notifications" element={<NotificationsPage />} />
          </Route>
        </Route>

        {/* ── Error Pages ────────────────────────────────────────────────── */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
