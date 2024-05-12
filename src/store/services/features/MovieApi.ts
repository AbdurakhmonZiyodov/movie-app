import { createApi } from '@reduxjs/toolkit/query/react';
import ApiBaseQuery from '../ApiBaseQuery';
import { MovieInfo, MovieType } from '@/shared/types';

export const MovieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: ApiBaseQuery({ baseUrl: '' }),
  tagTypes: ['movies'],
  endpoints: (builder) => ({
    allMovies: builder.query<MovieType[], { params?: any }>({
      query: ({ params }) => ({
        url: '/movie/',
        method: 'GET',
        providesTags: ['movies'],
        params,
      }),
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
    }),
    movieYearList: builder.query<{ id: string; year: number }[], void>({
      query: () => ({
        url: '/year',
        method: 'GET',
      }),
    }),
    movieCountryList: builder.query<{ id: string; name: string }[], void>({
      query: () => ({
        url: '/country',
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
  useMovieGanreListQuery,
  useLazyMovieGanreListQuery,
  useMovieYearListQuery,
  useLazyMovieYearListQuery,
  useMovieCountryListQuery,
  useLazyMovieCountryListQuery,
} = MovieApi;
