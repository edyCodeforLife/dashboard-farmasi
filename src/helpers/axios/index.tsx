import axios from 'axios';
import { GetStorage, RemoveStorage } from '../local-storage';

const url = process.env.REACT_APP_API_BASE_URL;

const Api = axios.create({
  baseURL: url,
  headers: {
    'Content-type': 'application/json',
  },
});

Api.interceptors.request.use(
  (config) => config,
  (error) => { Promise.reject(error); },
);

Api.interceptors.response.use((response: any) => response, (error: any) => {
  const condition: boolean = (
    (!GetStorage('access_token') && !GetStorage('refresh_token') && !GetStorage('role'))
    && window.location.pathname !== '/'
    && window.location.pathname !== '/forgot-password'
    && window.location.pathname !== '/verify-code'
    && window.location.pathname !== '/change-password'
  );

  if (error?.response?.status === 401 && GetStorage('access_token')) {
    RemoveStorage('role');
    RemoveStorage('access_token');
    RemoveStorage('refresh_token');
    window.location.href = '/';
  }

  if (condition) {
    window.location.href = '/order-unpaid';
  }

  return Promise.reject(error);
});

const ApiFile = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    'Accept-Language': 'ID',
  },
});

export { Api, ApiFile };
