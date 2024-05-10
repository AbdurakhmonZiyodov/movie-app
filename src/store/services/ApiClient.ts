import config from '@/config';
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const ApiClient: AxiosInstance = axios.create({
  baseURL: config.BASE_URL,
});

// Using the Request interceptor
ApiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) =>
    // All requests are accompanied by additional information
    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    config,
  (error) => Promise.reject(error),
);

// Using the Response interceptor
ApiClient.interceptors.response.use(
  (response: AxiosResponse) =>
    // Check or return data for Response
    response,
  (error) =>
    // Check or return data for error
    Promise.reject(error),
);

export default ApiClient;
