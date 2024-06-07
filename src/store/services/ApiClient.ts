import config from '@/config';
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApiClient: AxiosInstance = axios.create({
  baseURL: config.BASE_URL,
});

ApiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Parse the JSON string stored in AsyncStorage
      const storedData = await AsyncStorage.getItem('persist:root');
      const parsedData = storedData && (await JSON.parse(storedData));

      // Access the access_token from the parsed data
      const accessToken = parsedData.localStore
        ? JSON.parse(parsedData.localStore)?.tokens?.access_token
        : null;

      // Log the access token
      console.log('Access Token:', accessToken);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (err) {
      console.log('[Error:]:', err);
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
