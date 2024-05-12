import Container from '@/components/Container';
import RN from '@/components/RN';
import Video from '@/components/Video';
import config from '@/config';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS, addAlpha } from '@/shared/constants/colors';
import { normalizeHeight, normalizeWidth } from '@/shared/constants/dimensions';
import { MovieQuality, MovieStatusType } from '@/shared/types';
import {
  useMovieInfoQuery,
  useOneMovieQuery,
} from '@/store/services/features/MovieApi';
import { useLocalSearchParams } from 'expo-router';
import { findIndex, isEqual } from 'lodash';
import React, { useMemo, useState } from 'react';
import { ListRenderItem } from 'react-native';

function getMovieId(url: string): string {
  if (!url) return '';
  var splitUrl = url.split('/');
  var movieId = splitUrl[splitUrl.length - 1];
  return movieId;
}

const MOVIE_FORMAT = {
  [MovieQuality.hd_full]: 'Full HD',
  [MovieQuality.hd_720]: '720p',
  [MovieQuality.hd_420]: '420p',
  [MovieQuality.hd_360]: '360p',
  [MovieQuality.hd_244]: '244p',
};

const MovieScreen = () => {
  const { slug } = useLocalSearchParams();
  const [movieId, setMovieId] = useState<string>(slug as string);
  const { data: fullMovieData, isLoading: fullMovieLoading } = useOneMovieQuery(
    {
      id: slug as string,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const { data: movieInfo } = useMovieInfoQuery({ id: movieId });
  const [serialIndex, setSerialIndex] = useState(0);
  const isNotOk = useMemo(
    () => !fullMovieData || fullMovieLoading,
    [fullMovieData, fullMovieLoading],
  );

  const [movieVerticalImageUrl, movieHorizantalImageUrl] = useMemo(
    () => [
      config.IMAGE_URL + `/${fullMovieData?.images[0]}`,
      config.IMAGE_URL + `/${fullMovieData?.images[1]}`,
    ],
    [fullMovieData?.images],
  );

  const movieID = useMemo<string | null>(() => {
    let id: string | null = null;

    if (fullMovieData) {
      if (fullMovieData.movie_type === MovieStatusType.serial) {
        setMovieId(fullMovieData.childen_movie[serialIndex].id);
      }
      id = movieInfo?.video;
    }
    return id;
  }, [fullMovieData, movieInfo, serialIndex]);

  if (isNotOk)
    return (
      <RN.View flex={1} ai={'center'} jc={'center'}>
        <RN.ActivityIndicator size={'large'} color={COLORS.white} />
      </RN.View>
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
    <Container isScroll={true}>
      {movieID && (
        <Video
          key={movieID}
          videoID={getMovieId(movieID)}
          usePoster={true}
          posterSource={{
            uri: movieHorizantalImageUrl,
          }}
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
        {!!fullMovieData?.quality && (
          <RN.Text style={styles.subStatusText}>
            {MOVIE_FORMAT[fullMovieData?.quality]}
          </RN.Text>
        )}
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
              {fullMovieData?.sounder[0].name}
            </RN.Text>
          </RN.View>
          <RN.View fd={'row'} ai={'center'}>
            <RN.Text style={styles.body1Text}>{'Janr: '}</RN.Text>
            <RN.Text style={[styles.body1Text, styles.body1TextOrange]}>
              {fullMovieData?.sounder[1].name}
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
    fontFamily: PoppinsFonts.Poppins_600,
    color: COLORS.darkwhite,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: addAlpha(COLORS.darkwhite, 0.5),
    borderRadius: 4,
  },
  body1Text: {
    fontSize: normalizeHeight(14),
    fontFamily: PoppinsFonts.Poppins_400,
    color: COLORS.darkwhite,
  },
  body1TextOrange: {
    color: COLORS.orange,
  },
});
export default MovieScreen;
