import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true,
});

// Request Interceptor: Attach token if stored
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('edith_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clean stale session token if unauthorized
      localStorage.removeItem('edith_token');
    }
    return Promise.reject(error);
  }
);

export default API;
