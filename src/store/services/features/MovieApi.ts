import { createApi } from '@reduxjs/toolkit/query/react';
import ApiBaseQuery from '../ApiBaseQuery';
import { MovieInfo, MovieType, PaymentOrderResponseType } from '@/shared/types';
import {
  CommitType,
  OrderType,
  PremiumDiscountType,
} from '@/components/Video/types';

export const MovieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: ApiBaseQuery({ baseUrl: '' }),
  tagTypes: [
    'movies',
    'slider',
    'commits',
    'category',
    'country',
    'years',
    'movie-genre',
    'payment-status-list',
    'my-payment-status',
  ],
  endpoints: (builder) => ({
    allMovies: builder.query<MovieType[], { params?: any }>({
      query: ({ params }) => ({
        url: '/movie/',
        method: 'GET',
        params,
      }),
      providesTags: ['movies'],
    }),
    oneMovie: builder.query<MovieType, { id: string }>({
      query: ({ id }) => ({
        url: '/movie/' + id,
        method: 'GET',
      }),
    }),
    movieInfo: builder.query<MovieInfo, { id: string }>({
      query: ({ id }) => ({
        url: '/movie/movie-info/' + id,
        method: 'GET',
      }),
    }),
    movieGanreList: builder.query<{ id: string; name: string }[], void>({
      query: () => ({
        url: '/movie-genre/',
        method: 'GET',
      }),
      providesTags: ['movie-genre'],
    }),
    movieYearList: builder.query<{ id: string; year: number }[], void>({
      query: () => ({
        url: '/year',
        method: 'GET',
      }),
      providesTags: ['years'],
    }),
    movieCountryList: builder.query<{ id: string; name: string }[], void>({
      query: () => ({
        url: '/country',
        method: 'GET',
      }),
      providesTags: ['country'],
    }),
    movieCategories: builder.query<{ id: string; name: string }[], void>({
      query: () => ({
        url: `/category`,
        method: 'GET',
      }),
      providesTags: ['category'],
    }),
    movieSlides: builder.query<
      {
        id: string;
        name: string;
        images: string[];
      }[],
      void
    >({
      query: () => ({
        url: '/movie/slider',
        method: 'GET',
      }),
      providesTags: ['slider'],
    }),
    getAllCommitsFromTheMovie: builder.query<CommitType[], { id: string }>({
      query: ({ id }) => ({
        url: `/movie/${id}/commit`,
        method: 'GET',
      }),
      providesTags: (result, error, { id }) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'commits', id }) as const),
              { type: 'commits', id: 'LIST' },
            ]
          : [{ type: 'commits', id: 'LIST' }],
    }),

    addCommitToTheMovie: builder.mutation<
      Omit<CommitType, 'count_like' | 'count_dislike'>,
      { id: string; message: string }
    >({
      query: ({ id, message }) => ({
        url: `/movie/${id}/commit`,
        method: 'POST',
        data: {
          message,
        },
      }),
      invalidatesTags: [{ type: 'commits', id: 'LIST' }],
    }),
    allPremiumDiscount: builder.query<PremiumDiscountType[], void>({
      query: () => ({
        url: '/order/plan',
        method: 'GET',
      }),
      providesTags: ['payment-status-list'],
    }),
    getOrder: builder.query<OrderType, void>({
      query: () => ({
        url: '/order',
        method: 'GET',
      }),
      providesTags: ['my-payment-status'],
    }),
    addLikeOrDislike: builder.mutation<
      { count_like: number; count_dislike: number },
      { type: 'like' | 'dislike'; id: string }
    >({
      query: (data) => ({
        url: `/movie/commit/${data.id}/${data.type}`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'commits', id }],
    }),
    makePaymentOrder: builder.mutation<
      PaymentOrderResponseType,
      { premium_id: string }
    >({
      query: (data) => ({
        url: '/order/payment',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['my-payment-status'],
    }),
  }),
});

export const {
  useAllMoviesQuery,
  useOneMovieQuery,
  useMovieInfoQuery,
  useMovieGanreListQuery,
  useMovieYearListQuery,
  useMovieCountryListQuery,
  useMovieSlidesQuery,
  useGetAllCommitsFromTheMovieQuery,
  useAddCommitToTheMovieMutation,
  useMovieCategoriesQuery,
  useAllPremiumDiscountQuery,
  useGetOrderQuery,
  useMakePaymentOrderMutation,
  useAddLikeOrDislikeMutation,
} = MovieApi;
