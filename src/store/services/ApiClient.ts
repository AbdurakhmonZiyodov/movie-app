import config from '@/config';
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const ApiClient: AxiosInstance = axios.create({
  baseURL: config.BASE_URL,
});

ApiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => config,
  (error) => Promise.reject(error),
);

ApiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (err) => Promise.reject(err),
);

export default ApiClient;
