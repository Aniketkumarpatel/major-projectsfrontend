import axiosInstance from './axiosInstance';

export const authApi = {
  signup: (data) => axiosInstance.post('/auth/signup', data),
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  logout: () => axiosInstance.post('/auth/logout'),
  getMe: () => axiosInstance.get('/auth/me'),
  forgotPassword: (data) => axiosInstance.post('/auth/forgot-password', data),
  resetPassword: (data) => axiosInstance.post('/auth/reset-password', data),
};

export const categoryApi = {
  getAll: (params) => axiosInstance.get('/categories', { params }),
  getById: (id) => axiosInstance.get(`/categories/${id}`),
  create: (data) => axiosInstance.post('/categories', data),
  update: (id, data) => axiosInstance.put(`/categories/${id}`, data),
  delete: (id) => axiosInstance.delete(`/categories/${id}`),
};

export const serviceApi = {
  getAll: (params) => axiosInstance.get('/services', { params }),
  getById: (id) => axiosInstance.get(`/services/${id}`),
  create: (data) => axiosInstance.post('/services', data),
  update: (id, data) => axiosInstance.put(`/services/${id}`, data),
  delete: (id) => axiosInstance.delete(`/services/${id}`),
};

export const bookingApi = {
  create: (data) => axiosInstance.post('/bookings', data),
  getAll: (params) => axiosInstance.get('/bookings', { params }),
  getById: (id) => axiosInstance.get(`/bookings/${id}`),
  accept: (id) => axiosInstance.put(`/bookings/${id}/accept`),
  reject: (id, reason) => axiosInstance.put(`/bookings/${id}/reject`, { reason }),
  start: (id) => axiosInstance.put(`/bookings/${id}/start`),
  complete: (id) => axiosInstance.put(`/bookings/${id}/complete`),
  cancel: (id, reason) => axiosInstance.put(`/bookings/${id}/cancel`, { reason }),
};

export const reviewApi = {
  create: (data) => axiosInstance.post('/reviews', data),
  getAll: (params) => axiosInstance.get('/reviews', { params }),
  getById: (id) => axiosInstance.get(`/reviews/${id}`),
  getByProvider: (providerId, params) => axiosInstance.get(`/reviews/provider/${providerId}`, { params }),
  getByService: (serviceId, params) => axiosInstance.get(`/reviews/service/${serviceId}`, { params }),
  update: (id, data) => axiosInstance.put(`/reviews/${id}`, data),
  delete: (id) => axiosInstance.delete(`/reviews/${id}`),
};

export const customerApi = {
  getDashboard: () => axiosInstance.get('/customer/dashboard'),
  getProfile: () => axiosInstance.get('/customer/profile'),
  updateProfile: (data) => axiosInstance.put('/customer/profile', data),
  getBookings: (params) => axiosInstance.get('/customer/bookings', { params }),
  getUpcomingBookings: () => axiosInstance.get('/customer/upcoming-bookings'),
  getCompletedBookings: () => axiosInstance.get('/customer/completed-bookings'),
  getCancelledBookings: () => axiosInstance.get('/customer/cancelled-bookings'),
  getReviews: () => axiosInstance.get('/customer/reviews'),
  getNotifications: () => axiosInstance.get('/customer/notifications'),
};

export const providerApi = {
  getDashboard: () => axiosInstance.get('/provider/dashboard'),
  getProfile: () => axiosInstance.get('/provider/profile'),
  updateProfile: (data) => axiosInstance.put('/provider/profile', data),
  getServices: (params) => axiosInstance.get('/provider/services', { params }),
  getBookings: (params) => axiosInstance.get('/provider/bookings', { params }),
  getReviews: () => axiosInstance.get('/provider/reviews'),
  getEarnings: () => axiosInstance.get('/provider/earnings'),
};

export const adminApi = {
  getDashboard: () => axiosInstance.get('/admin/dashboard'),
  getUsers: (params) => axiosInstance.get('/admin/users', { params }),
  updateUserStatus: (id, isActive) => axiosInstance.put(`/admin/users/${id}/status`, { isActive }),
  deleteUser: (id) => axiosInstance.delete(`/admin/users/${id}`),
  getProviders: (params) => axiosInstance.get('/admin/providers', { params }),
  verifyProvider: (id, status, notes) => axiosInstance.put(`/admin/providers/${id}/verify`, { status, notes }),
  getServices: (params) => axiosInstance.get('/admin/services', { params }),
  updateServiceStatus: (id, isActive, isFeatured) => axiosInstance.put(`/admin/services/${id}/status`, { isActive, isFeatured }),
  getCategories: () => axiosInstance.get('/admin/categories'),
  getBookings: (params) => axiosInstance.get('/admin/bookings', { params }),
  getReviews: () => axiosInstance.get('/admin/reviews'),
  getPayments: (params) => axiosInstance.get('/admin/payments', { params }),
  getContacts: (params) => axiosInstance.get('/admin/contacts', { params }),
};

export const contactApi = {
  submit: (data) => axiosInstance.post('/contact', data),
  getAll: (params) => axiosInstance.get('/contact', { params }),
};

export const faqApi = {
  getAll: () => axiosInstance.get('/faqs'),
  create: (data) => axiosInstance.post('/faqs', data),
  update: (id, data) => axiosInstance.put(`/faqs/${id}`, data),
  delete: (id) => axiosInstance.delete(`/faqs/${id}`),
};

export const paymentApi = {
  createIntent: (data) => axiosInstance.post('/payments/create-intent', data),
  verify: (data) => axiosInstance.post('/payments/verify', data),
  getHistory: (params) => axiosInstance.get('/payments/history', { params }),
};

export const notificationApi = {
  getAll: (params) => axiosInstance.get('/notifications', { params }),
  getUnreadCount: () => axiosInstance.get('/notifications/unread-count'),
  markAsRead: (id) => axiosInstance.put(`/notifications/${id}/read`),
  markAllAsRead: () => axiosInstance.put('/notifications/read-all'),
  delete: (id) => axiosInstance.delete(`/notifications/${id}`),
  clearAll: () => axiosInstance.delete('/notifications/clear-all'),
};

export const uploadApi = {
  uploadProfile: (formData) =>
    axiosInstance.post('/upload/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  uploadProviderImage: (formData) =>
    axiosInstance.post('/upload/provider-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  uploadServiceImages: (serviceId, formData) =>
    axiosInstance.post(`/upload/service-images/${serviceId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};
