import api from './api.js';

export const projectAPI = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  generateBlueprint: (id) => api.post(`/projects/${id}/generate`),
  delete: (id) => api.delete(`/projects/${id}`),
};
