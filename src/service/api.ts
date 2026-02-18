import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import { BASE_URL } from '@/constants/urls';

interface RefreshResponse {
  access_token: string;
}

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // important if refresh uses cookies
});

/**
 * -------------------------
 * REQUEST INTERCEPTOR
 * -------------------------
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
 * -------------------------
 * RESPONSE INTERCEPTOR
 * -------------------------
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If 401 and request not retried yet
    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes('/auth/client/login') &&
      !originalRequest._retry
    ) {
      // Prevent infinite loop for refresh endpoint itself
      if (originalRequest.url?.includes('/auth/client/refresh')) {
        localStorage.removeItem('access_token');
        window.location.href = '/';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue requests while refresh is happening
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post<RefreshResponse>(
          `${BASE_URL}/auth/client/refresh`,
          { refreshToken },
          {
            withCredentials: true,
            headers: {
              Cookie: `refreshToken=${refreshToken}`,
            },
          },
        );

        const newAccessToken = response.data.access_token;

        localStorage.setItem('access_token', newAccessToken);
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('access_token');
        window.location.href = '/';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
