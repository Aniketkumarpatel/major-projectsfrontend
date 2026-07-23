import axiosInstance from './axiosInstance';

/**
 * Auth API service.
 * All methods return the full Axios response — destructure `.data` in callers.
 */
const authService = {
  register: (userData) => axiosInstance.post('/auth/register', userData),
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  logout: () => axiosInstance.post('/auth/logout'),
  forgotPassword: (email) => axiosInstance.post('/auth/forgot-password', { email }),
  resetPassword: (token, passwords) => axiosInstance.patch(`/auth/reset-password/${token}`, passwords),
  verifyEmail: (token) => axiosInstance.get(`/auth/verify-email/${token}`),
  refreshToken: () => axiosInstance.post('/auth/refresh-token'),
};

export default authService;
