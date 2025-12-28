import { BASE_URL } from '@/constants/urls';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/**
 * REQUEST INTERCEPTOR
 * Attaches Authorization token
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Ensure this runs only on client
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * RESPONSE INTERCEPTOR
 * Handles global errors (401, etc.)
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;

    if (status === 401 && typeof window !== 'undefined') {
      // Token expired or invalid
      localStorage.removeItem('access_token');

      // Optional redirect
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);
