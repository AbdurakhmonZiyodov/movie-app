import Container from '@/components/Container';
import RN from '@/components/RN';

import config from '@/config';
import { COLORS } from '@/shared/constants/colors';
import { CoreStyle } from '@/shared/styles/globalStyles';
import {
  MoviePaymentStatusType,
  MovieQuality,
  MovieStatusType,
} from '@/shared/types';
import { useProfileInfoQuery } from '@/store/services/features/AuthApi';
import {
  useAddCommitToTheMovieMutation,
  useGetAllCommitsFromTheMovieQuery,
  useOneMovieQuery,
} from '@/store/services/features/MovieApi';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MovieCommits, MovieDetails, MovieEpisodeList, MovieModal } from './ui';
import BackButton from '@/components/BackButton';
import { UseVisibility } from '@/shared/hooks/useVisibility';

export const MOVIE_FORMAT = {
  [MovieQuality.hd_full]: 'Full HD',
  [MovieQuality.hd_720]: '720p',
  [MovieQuality.hd_420]: '420p',
  [MovieQuality.hd_360]: '360p',
  [MovieQuality.hd_244]: '244p',
};

const MovieScreen = () => {
  const { slug: movieId } = useLocalSearchParams();
  const [serialIndex, setSerialIndex] = useState(0);
  const movieModalRef = useRef<UseVisibility>(null);

  const navigation = useNavigation();
  const { data: commitsData = [] } = useGetAllCommitsFromTheMovieQuery({
    // @ts-expect-error
    id: movieId,
  });
  const [addNewCommitToTheMovie, { isLoading: addCommitLoading }] =
    useAddCommitToTheMovieMutation();
  const { data: userInfoData } = useProfileInfoQuery();
  const { data: fullMovieData, isLoading: fullMovieLoading } = useOneMovieQuery(
    {
      id: movieId as any,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const isNotOk = useMemo(
    () => !fullMovieData || fullMovieLoading,
    [fullMovieData, fullMovieLoading],
  );

  const [movieVerticalImageUrl] = useMemo(
    () => [
      config.IMAGE_URL + `/${fullMovieData?.images[0]}`,
      config.IMAGE_URL + `/${fullMovieData?.images[1]}`,
    ],
    [fullMovieData?.images],
  );
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      commit: '',
    },
  });

  const NO_PERMISSION_TO_WATCH_IT =
    fullMovieData?.status_type === MoviePaymentStatusType.premium &&
    userInfoData?.data.status_type === MoviePaymentStatusType.free;

  useEffect(() => {
    ((status) => {
      if (status) {
        RN.Alert.alert(
          'Ogohlantirish!',
          'Kechirasiz, bu video faqat Premium account lar uchun!',
          [
            {
              text: 'Tushundim',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
        );
      }
    })(NO_PERMISSION_TO_WATCH_IT);
  }, [NO_PERMISSION_TO_WATCH_IT, navigation]);

  if (isNotOk)
    return (
      <Container style={CoreStyle.center} backgroundColor={COLORS.dark}>
        <RN.ActivityIndicator size={'large'} color={COLORS.white} />
      </Container>
    );

  const addNewCommit = handleSubmit(
    async ({ commit }) => {
      if (commit && movieId) {
        const res = await addNewCommitToTheMovie({
          // @ts-expect-error
          id: movieId,
          message: commit,
        });

        if (res.data) {
          reset();
        }
      }
    },
    (_error) => {},
  );

  return (
    <>
      <Container
        isScroll={true}
        backgroundColor={COLORS.dark}
        style={CoreStyle.flex1}
        Header={<BackButton />}
      >
        <RN.View p={20}>
          <RN.Button
            title={'Video tomosha qilish'}
            color={COLORS.orange}
            onPress={() => {
              // Play video
              movieModalRef.current?.show();
            }}
          />
        </RN.View>

        {fullMovieData?.movie_type === MovieStatusType.serial &&
          fullMovieData?.childen_movie && (
            <MovieEpisodeList
              data={fullMovieData?.childen_movie}
              index={serialIndex}
              setIndex={(newIndex) => {
                setSerialIndex(newIndex);
              }}
            />
          )}
        <MovieDetails
          fullMovieData={fullMovieData}
          movieVerticalImageUrl={movieVerticalImageUrl}
        />
        <RN.View style={styles.orangeLine} mb={12} />

        <MovieCommits
          data={commitsData}
          control={control}
          onPress={addNewCommit}
          isLoading={addCommitLoading}
        />
      </Container>
      <MovieModal
        modalRef={movieModalRef}
        id={
          fullMovieData?.movie_type === MovieStatusType.movie
            ? movieId
            : fullMovieData?.childen_movie[serialIndex]?.id
        }
      />
    </>
  );
};

const styles = RN.StyleSheet.create({
  orangeLine: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.orange,
    width: '100%',
  },
});
export default memo(MovieScreen);
