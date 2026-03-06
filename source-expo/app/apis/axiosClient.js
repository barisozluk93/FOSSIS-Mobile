import axios from 'axios';
import {
  loadToken,
  loadRefreshToken,
  saveToken,
  removeToken,
} from '../utils/storage';
import { refreshTokenRequest } from './authApi';
import * as rootNavigation from '../navigation/rootNavigation';


const api = axios.create({
  baseURL: 'http://192.168.1.116:5055/api',
  timeout: 15000,
});


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(
  async config => {
    const token = await loadToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);


api.interceptors.response.use(
  response => response,

  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !originalRequest?.url?.includes('/auth')
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = await loadRefreshToken();
        if (!refreshToken) {
          throw new Error('Refresh token yok');
        }

        const authResponse = await refreshTokenRequest(refreshToken);
        console.log('Token yenileme başarılı:', authResponse);
        await saveToken(authResponse);

        api.defaults.headers.common.Authorization =
          `Bearer ${authResponse.accessToken}`;

        processQueue(null, authResponse.accessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization =
          `Bearer ${authResponse.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await removeToken();
        rootNavigation.navigate('NewsMenu');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
