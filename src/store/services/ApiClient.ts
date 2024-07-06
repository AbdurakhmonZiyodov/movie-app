import config from '@/config';
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEBUG } from '@/shared/constants/global';

const ApiClient: AxiosInstance = axios.create({
  baseURL: config.BASE_URL,
});

ApiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Parse the JSON string stored in AsyncStorage
      // @TODO: need to use react-native-mmkv instead of AsyncStorage, it could be better for secure
      const storedData = await AsyncStorage.getItem('persist:root'); // @TODO: in the future, it should be improved
      const parsedData = storedData && (await JSON.parse(storedData));

      // Access the access_token from the parsed data
      const accessToken = parsedData.localStore
        ? JSON.parse(parsedData.localStore)?.tokens?.access_token
        : null;

      // Log the access token
      // if (DEBUG) console.info('Access Token:', accessToken);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      const method = config.method?.toUpperCase();
      const url = config.url;
      const message = `${method}:${config.baseURL}${url}`;
      if (DEBUG) console.info([message, new Date().toLocaleString()]);
    } catch (err) {
      if (DEBUG) console.error('[Error:]:', err); // @TODO: Error handling should be implemented
    }

    return config;
  },
  (error) => Promise.reject(error),
);

ApiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (err) => Promise.reject(err),
);

export default ApiClient;
