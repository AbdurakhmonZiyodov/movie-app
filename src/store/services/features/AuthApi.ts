import { createApi } from '@reduxjs/toolkit/query/react';
import ApiBaseQuery from '../ApiBaseQuery';
import { LoginResponse } from '@/shared/types';

export const AuthApi = createApi({
  reducerPath: 'authApi',
  baseQuery: ApiBaseQuery({ baseUrl: '/auth' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (user) => ({
          url: '/login',
          method: 'POST',
          data: user,
        }),
      },
    ),
    refresh: builder.mutation({
      query: () => ({
        url: '/refresh',
        method: 'POST',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation, useLogoutMutation } =
  AuthApi;
