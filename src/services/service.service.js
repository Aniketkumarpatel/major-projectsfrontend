import axiosInstance from './axiosInstance';

const serviceApi = {
  getAll: (params) => axiosInstance.get('/services', { params }),
  getById: (id) => axiosInstance.get(`/services/${id}`),
  search: (query) => axiosInstance.get('/services/search', { params: query }),
  create: (data) => axiosInstance.post('/services', data),
  update: (id, data) => axiosInstance.patch(`/services/${id}`, data),
  remove: (id) => axiosInstance.delete(`/services/${id}`),
};

export default serviceApi;
