import axios from 'axios';

// Get API base URL from environment or use localhost for development
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const isProduction = import.meta.env.PROD;

console.log(`[API] Environment: ${isProduction ? 'Production' : 'Development'}`);
console.log(`[API] Base URL: ${BASE_URL}`);

const api = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor — normalise error shape and provide helpful messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let detail = error.message || 'An unexpected error occurred';

    if (error.response?.data?.detail) {
      detail = error.response.data.detail;
    } else if (error.response?.data?.message) {
      detail = error.response.data.message;
    } else if (error.code === 'ERR_NETWORK') {
      detail = `Network error: Cannot connect to API at ${BASE_URL}. Make sure your backend is running and VITE_API_BASE_URL is set correctly.`;
    } else if (error.code === 'ECONNREFUSED') {
      detail = `Connection refused: Backend API not available at ${BASE_URL}`;
    }

    return Promise.reject(new Error(detail));
  }
);

export default api;
