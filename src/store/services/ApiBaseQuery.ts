import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig } from 'axios';
import ApiClient from './ApiClient';

const ApiBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' },
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    const result = await ApiClient({
      url: baseUrl + url,
      method,
      data,
      params,
      headers,
    });

    return { data: result.data };
  };

export default ApiBaseQuery;
