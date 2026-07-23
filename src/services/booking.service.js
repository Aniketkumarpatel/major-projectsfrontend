import axiosInstance from './axiosInstance';

const bookingApi = {
  getAll: (params) => axiosInstance.get('/bookings', { params }),
  getById: (id) => axiosInstance.get(`/bookings/${id}`),
  create: (data) => axiosInstance.post('/bookings', data),
  update: (id, data) => axiosInstance.patch(`/bookings/${id}`, data),
  cancel: (id, reason) => axiosInstance.patch(`/bookings/${id}/cancel`, { reason }),
  confirm: (id) => axiosInstance.patch(`/bookings/${id}/confirm`),
  complete: (id) => axiosInstance.patch(`/bookings/${id}/complete`),
};

export default bookingApi;
