import { createApi } from '@reduxjs/toolkit/query/react';
import ApiBaseQuery from '../ApiBaseQuery';
import { MovieInfo, MovieType } from '@/shared/types';
import { CommitType } from '@/components/Video/types';

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
      query: (_data) => ({
        url: `/movie/${_data.id}/commit`,
        method: 'GET',
      }),
      providesTags: ['commits'],
    }),
    addCommitToTheMovie: builder.mutation<
      Omit<CommitType, 'count_like' | 'count_dislike'>,
      { id: string; message: string }
    >({
      query: (_data) => ({
        url: `/movie/${_data.id}/commit`,
        method: 'POST',
        data: {
          message: _data.message,
        },
      }),
      invalidatesTags: ['commits'],
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
  useMovieSlidesQuery,
  useLazyMovieSlidesQuery,
  useGetAllCommitsFromTheMovieQuery,
  useLazyGetAllCommitsFromTheMovieQuery,
  useAddCommitToTheMovieMutation,
  useMovieCategoriesQuery,
  useLazyMovieCategoriesQuery,
} = MovieApi;
