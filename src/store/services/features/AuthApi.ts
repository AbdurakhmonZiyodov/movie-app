import { createApi } from '@reduxjs/toolkit/query/react';
import ApiBaseQuery from '../ApiBaseQuery';
import { LoginResponse, ProfileInfoResponse, Tokens } from '@/shared/types';

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
    loginWithGoogle: builder.mutation<
      { data: Tokens; success: boolean; message: string },
      { google_token: string }
    >({
      query: (data) => ({
        url: '/google',
        method: 'POST',
        data,
      }),
    }),
    registerEmail: builder.mutation<
      { success: boolean; message: string },
      { name: string; email: string; password: string }
    >({
      query: (user) => ({
        url: '/login/email',
        method: 'POST',
        data: user,
      }),
    }),
    registerEmailVerification: builder.mutation<
      { success: boolean; message: string; data: Tokens },
      { email: string; code: string }
    >({
      query: (data) => ({
        url: '/login/email/verify',
        method: 'POST',
        data,
      }),
    }),
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
    profileInfo: builder.query<ProfileInfoResponse, void>({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshMutation,
  useProfileInfoQuery,
  useLazyProfileInfoQuery,
  useRegisterEmailMutation,
  useRegisterEmailVerificationMutation,
  useLoginWithGoogleMutation,
} = AuthApi;
