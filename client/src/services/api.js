import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '';

const api = axios.create({ baseURL: API_BASE });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('devluma_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err.response?.data || { error: 'Network error' })
);

export const projectsAPI = {
  getAll: (params) => api.get('/api/projects', { params }),
  getOne: (id) => api.get(`/api/projects/${id}`),
  create: (data) => api.post('/api/projects', data),
  update: (id, data) => api.put(`/api/projects/${id}`, data),
  delete: (id) => api.delete(`/api/projects/${id}`),
};

export const blogsAPI = {
  getAll: (params) => api.get('/api/blogs', { params }),
  getOne: (id) => api.get(`/api/blogs/${id}`),
  create: (data) => api.post('/api/blogs', data),
  update: (id, data) => api.put(`/api/blogs/${id}`, data),
  delete: (id) => api.delete(`/api/blogs/${id}`),
};

export const testimonialsAPI = {
  getAll: (params) => api.get('/api/testimonials', { params }),
  create: (data) => api.post('/api/testimonials', data),
  update: (id, data) => api.put(`/api/testimonials/${id}`, data),
  delete: (id) => api.delete(`/api/testimonials/${id}`),
};

export const contactAPI = {
  send: (data) => api.post('/api/contact', data),
  getAll: () => api.get('/api/contact'),
  markRead: (id) => api.put(`/api/contact/${id}/read`),
  delete: (id) => api.delete(`/api/contact/${id}`),
};

export const authAPI = {
  login: (data) => api.post('/api/auth/login', data),
  me: () => api.get('/api/auth/me'),
  seed: () => api.post('/api/auth/seed'),
};

export default api;
