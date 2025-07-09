import axios from 'axios';
import { getAuthToken, removeAuthToken } from './auth';
console.log(".env for frontend ",import.meta.env.VITE_API_URL);
// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Hardcoded for local dev
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeAuthToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => {
    // Use real backend API for login
    return api.post('/auth/login', credentials);
  },
  logout: () => {
    // Optional: Call backend logout endpoint if you want server-side logout
    // For now, just return a resolved promise since we handle logout client-side
    return Promise.resolve();
  },
  getCurrentUser: () => {
    // Get current user from backend using token
    return api.get('/auth/me');
  },
};

// Campaign API
export const campaignAPI = {
  getAll: () => api.get('/campaigns'),
  getById: (id) => api.get(`/campaigns/${id}`),
  create: (campaignData) => api.post('/campaigns', campaignData),
  update: (id, campaignData) => api.put(`/campaigns/${id}`, campaignData),
  delete: (id) => api.delete(`/campaigns/${id}`),
};

// Billboard API
export const billboardAPI = {
  getAll: () => api.get('/billboards'),
  getById: (id) => api.get(`/billboards/${id}`),
  create: (billboardData) => api.post('/billboards', billboardData),
  trackConversion: (id, conversionData) => api.post(`/billboards/${id}/conversion`, conversionData),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;