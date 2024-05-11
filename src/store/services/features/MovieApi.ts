import { createApi } from '@reduxjs/toolkit/query/react';
import ApiBaseQuery from '../ApiBaseQuery';
import { MovieType } from '@/shared/types';

export const MovieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: ApiBaseQuery({ baseUrl: '/movie' }),
  tagTypes: ['movies'],
  endpoints: (builder) => ({
    allMovies: builder.query<MovieType[], void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
    }),
    oneMovie: builder.query<MovieType, { id: string }>({
      query: ({ id }) => ({
        url: '/' + id,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAllMoviesQuery,
  useLazyAllMoviesQuery,
  useOneMovieQuery,
  useLazyOneMovieQuery,
} = MovieApi;
