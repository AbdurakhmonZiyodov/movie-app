import BackButton from '@/components/BackButton';
import { Button } from '@/components/Button';
import Commit from '@/components/Commit';
import Container from '@/components/Container';
import { FormInput } from '@/components/FormController/FormController';
import RN from '@/components/RN';
import RNVideo from '@/components/RNVideo';
import RenderHtml from '@/components/RenderHtml';
import { Spacing } from '@/components/Spacing';
import config from '@/config';
import { OpenSansFonts } from '@/shared/assets/fonts/open-sans.fonts';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS, addAlpha } from '@/shared/constants/colors';
import { normalizeHeight, normalizeWidth } from '@/shared/constants/dimensions';
import { CoreStyle } from '@/shared/styles/globalStyles';
import { MovieQuality, MovieStatusType } from '@/shared/types';
import {
  useAddCommitToTheMovieMutation,
  useGetAllCommitsFromTheMovieQuery,
  useOneMovieQuery,
} from '@/store/services/features/MovieApi';
import { useLocalSearchParams } from 'expo-router';
import { findIndex, isEqual, map, orderBy } from 'lodash';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ListRenderItem } from 'react-native';

export const MOVIE_FORMAT = {
  [MovieQuality.hd_full]: 'Full HD',
  [MovieQuality.hd_720]: '720p',
  [MovieQuality.hd_420]: '420p',
  [MovieQuality.hd_360]: '360p',
  [MovieQuality.hd_244]: '244p',
};

const MovieScreen = () => {
  const { slug: movieId } = useLocalSearchParams();

  const { data: commitsData = [] } = useGetAllCommitsFromTheMovieQuery({
    // @ts-expect-error
    id: movieId,
  });
  const [addNewCommitToTheMovie, { isLoading: addCommitLoading }] =
    useAddCommitToTheMovieMutation();
  const { data: fullMovieData, isLoading: fullMovieLoading } = useOneMovieQuery(
    {
      id: movieId as any,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const [serialIndex, setSerialIndex] = useState(0);
  const isNotOk = useMemo(
    () => !fullMovieData || fullMovieLoading,
    [fullMovieData, fullMovieLoading],
  );

  console.log({ movieId });

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

  if (isNotOk)
    return (
      <Container style={CoreStyle.center}>
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

  const renderSmallButton: ListRenderItem<{
    id: string;
    name: string;
    movie_type: string;
  }> = ({ item: movie, index }) => {
    const isActive = isEqual(
      findIndex(fullMovieData?.childen_movie, { id: movie.id }),
      serialIndex,
    );

    return (
      <RN.TouchableOpacity
        style={[styles.smallButton, isActive && styles.activeSmallButton]}
        onPress={() => setSerialIndex(() => index)}
      >
        <RN.Text
          style={[
            styles.smallButtonText,
            isActive && styles.activeSmallButtonText,
          ]}
        >
          {`${movie.name}`}
        </RN.Text>
      </RN.TouchableOpacity>
    );
  };

  return (
    <Container
      isScroll={true}
      Header={
        <RN.View pb={10}>
          <BackButton />
        </RN.View>
      }
    >
      {(movieId || fullMovieData?.childen_movie[serialIndex].id) && (
        <RNVideo
          id={
            fullMovieData?.movie_type === MovieStatusType.movie
              ? movieId
              : fullMovieData?.childen_movie[serialIndex].id
          }
        />
      )}
      {fullMovieData?.movie_type === MovieStatusType.serial &&
        fullMovieData?.childen_movie && (
          <RN.FlatList
            data={fullMovieData.childen_movie ?? []}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, key) => `key-${key}`}
            contentContainerStyle={styles.smallButtonGroup}
            renderItem={renderSmallButton}
          />
        )}
      <RN.Text style={styles.movieName}>{fullMovieData?.name}</RN.Text>
      <RN.View fd={'row'} ai={'flex-start'} pt={4} pb={18} g={10}>
        <RN.Text style={styles.subStatusText}>
          {fullMovieData?.min_age}
          {'+'}
        </RN.Text>
        <RN.Text style={styles.subStatusText}>
          {fullMovieData?.status_type}
        </RN.Text>
      </RN.View>
      {!!movieVerticalImageUrl && (
        <RN.Image
          source={{ uri: movieVerticalImageUrl }}
          style={styles.movieVerticalImage}
          contentFit={'cover'}
        />
      )}
      <RN.View pt={10}>
        <RN.View>
          <RN.View fd={'row'} ai={'center'}>
            <RN.Text style={styles.body1Text}>{'Ovoz berdi: '}</RN.Text>
            <RN.Text style={[styles.body1Text, styles.body1TextOrange]}>
              {fullMovieData?.sounder[0]?.name}
            </RN.Text>
          </RN.View>
          <RN.View fd={'row'} ai={'center'}>
            <RN.Text style={styles.body1Text}>{'Janr: '}</RN.Text>
            <RN.Text style={[styles.body1Text, styles.body1TextOrange]}>
              {fullMovieData?.sounder[1]?.name}
            </RN.Text>
          </RN.View>
          <RN.View fd={'row'} ai={'center'}>
            <RN.Text style={styles.body1Text}>{'Yili: '}</RN.Text>
            <RN.Text style={[styles.body1Text, styles.body1TextOrange]}>
              {fullMovieData?.year.year}
            </RN.Text>
          </RN.View>
          <RN.View fd={'row'} ai={'center'}>
            <RN.Text style={styles.body1Text}>{'Mamlakat: '}</RN.Text>
            <RN.Text style={[styles.body1Text, styles.body1TextOrange]}>
              {fullMovieData?.country.name}
            </RN.Text>
          </RN.View>
          <RN.View fd={'row'} ai={'center'}>
            <RN.Text style={styles.body1Text}>{'Tarjima: '}</RN.Text>
            <RN.Text style={[styles.body1Text, styles.body1TextOrange]}>
              {fullMovieData?.language}
            </RN.Text>
          </RN.View>
        </RN.View>
      </RN.View>
      <Spacing height={11} />
      <RN.View p={10} bgColor={COLORS.black2} bdrs={11}>
        <RenderHtml children={fullMovieData?.descr} style={styles.body1Text} />
      </RN.View>
      <RN.Text style={styles.largeTitle}>{'Izohlar'}</RN.Text>
      <RN.View style={styles.orangeLine} mb={12} />
      <FormInput
        placeholder={'Izoh yozing...'}
        multiline={true}
        control={control}
        name={'commit'}
        inputStyle={styles.textAreaInput}
      />
      <RN.View w={150} pt={10} pb={30}>
        <Button
          title={'Yuborish'}
          onPress={addNewCommit}
          loading={addCommitLoading}
        />
      </RN.View>

      {commitsData?.length > 0 && (
        <RN.ScrollView nestedScrollEnabled={true} style={{ height: 500 }}>
          {map(
            orderBy(commitsData, ['created_at']).reverse() ?? [],
            (commit) => (
              <Commit key={commit.id} {...commit} />
            ),
          )}
        </RN.ScrollView>
      )}
    </Container>
  );
};

const styles = RN.StyleSheet.create({
  smallButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: COLORS.black2,
    borderColor: COLORS.black2,
  },
  activeSmallButton: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  smallButtonText: {
    fontSize: normalizeHeight(16),
    color: COLORS.black3,
    fontFamily: PoppinsFonts.Poppins_300,
  },
  activeSmallButtonText: {
    color: COLORS.white,
  },
  smallButtonGroup: {
    gap: 10,
    paddingTop: 18,
    paddingBottom: 20,
  },
  movieName: {
    fontSize: normalizeHeight(36),
    fontFamily: PoppinsFonts.Poppins_500,
    color: COLORS.white,
    lineHeight: normalizeHeight(54),
  },
  movieVerticalImage: {
    width: normalizeWidth(170),
    height: normalizeHeight(220),
    borderRadius: 11,
  },
  subStatusText: {
    fontSize: normalizeHeight(12),
    fontFamily: OpenSansFonts.OpenSans_600,
    color: COLORS.darkwhite,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: addAlpha(COLORS.darkwhite, 0.5),
    borderRadius: 4,
  },
  body1Text: {
    fontSize: normalizeHeight(14),
    fontFamily: OpenSansFonts.OpenSans_400,
    color: COLORS.darkwhite,
  },
  body1TextOrange: {
    color: COLORS.orange,
  },
  largeTitle: {
    fontSize: normalizeHeight(23),
    fontFamily: PoppinsFonts.Poppins_600,
    color: COLORS.white,
    paddingVertical: 15,
  },
  orangeLine: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.orange,
    width: '100%',
  },
  textAreaInput: {
    minHeight: 60,
  },
});
export default MovieScreen;
