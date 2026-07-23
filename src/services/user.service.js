import axiosInstance from './axiosInstance';

const userApi = {
  getMe: () => axiosInstance.get('/users/me'),
  updateMe: (data) => axiosInstance.patch('/users/me', data),
  deleteMe: () => axiosInstance.delete('/users/me'),
  // Admin
  getAll: (params) => axiosInstance.get('/users', { params }),
  getById: (id) => axiosInstance.get(`/users/${id}`),
  update: (id, data) => axiosInstance.patch(`/users/${id}`, data),
  remove: (id) => axiosInstance.delete(`/users/${id}`),
};

export default userApi;
