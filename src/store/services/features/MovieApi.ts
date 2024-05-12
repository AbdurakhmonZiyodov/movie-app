import { createApi } from '@reduxjs/toolkit/query/react';
import ApiBaseQuery from '../ApiBaseQuery';
import { MovieInfo, MovieType } from '@/shared/types';

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
    movieInfo: builder.query<MovieInfo, { id: string }>({
      query: ({ id }) => ({
        url: '/movie-info/' + id,
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
  useMovieInfoQuery,
  useLazyMovieInfoQuery,
} = MovieApi;
