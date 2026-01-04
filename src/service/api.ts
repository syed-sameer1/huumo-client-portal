import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from '@/constants/urls';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/**
 * REQUEST INTERCEPTOR
 * Attach Authorization token dynamically
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * RESPONSE INTERCEPTOR
 * Handle auth errors globally
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    console.log({ error });
    if (error.response?.status === 403 && typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }

    return Promise.reject(error);
  },
);
