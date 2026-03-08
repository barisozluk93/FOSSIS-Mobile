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

api.interceptors.request.use(async (config) => {
  const token = await loadToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }


      isRefreshing = true;

      try {
        const accessToken = await loadToken();
        const refreshToken = await loadRefreshToken();
        if (!accessToken || !refreshToken) {
          throw new Error("No access or refresh token");
        }

        // Refresh isteği
        const authResponse = await refreshTokenRequest(accessToken, refreshToken);
        await saveToken(authResponse);
        api.defaults.headers.Authorization = "Bearer " + authResponse.accessToken;
        processQueue(null, authResponse.accessToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        await removeToken();
        rootNavigation.navigate('SignIn');
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
