import Carousel from '@/components/Carousel';
import Container from '@/components/Container';
import CardHorizantalFilter from '@/components/Filters/CardHorizantalFilter';
import MovieList from '@/components/MovieList';
import RN from '@/components/RN';
import config from '@/config';
import { InterFonts } from '@/shared/assets/fonts/inter.fonts';
import { COLORS } from '@/shared/constants/colors';
import { SIZES } from '@/shared/constants/dimensions';
import {
  useAllMoviesQuery,
  useMovieCategoriesQuery,
  useMovieSlidesQuery,
} from '@/store/services/features/MovieApi';
import { router } from 'expo-router';
import { map } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import type { CarouselRenderItem } from 'react-native-reanimated-carousel';

const sizes = {
  width: SIZES.width * 1,
  height: SIZES.width * 1 * 0.8,
};
export default function HomeScreen() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const filterParams = useMemo(() => {
    const params: any = {};
    if (selectedCategoryId) {
      params['category_id'] = selectedCategoryId;
    } else {
      delete params['category_id'];
    }
    return params;
  }, [selectedCategoryId]);

  const { data: allMovies, isLoading } = useAllMoviesQuery({
    params: filterParams,
  });
  const { data: sliders } = useMovieSlidesQuery();

  const { data: categoriesList } = useMovieCategoriesQuery();

  const slidersData = useMemo(
    () =>
      map(sliders || [], (slide) => ({
        id: slide.id,
        name: slide.name,
        source: { uri: config.IMAGE_URL + '/' + slide.images[0] },
      })),
    [sliders],
  );

  const navigateToMovie = useCallback((id: string) => {
    router.navigate(`/movie/${id}`);
  }, []);

  const renderItem: CarouselRenderItem<(typeof slidersData)[0]> = useCallback(
    ({ item: card }) => (
      <RN.TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigateToMovie(card.id)}
      >
        <RN.View w={sizes.width * 0.87} h={sizes.width * 0.8} ai={'center'}>
          <RN.Image
            source={card.source}
            style={styles.movieImage}
            contentFit={'cover'}
          />
          <RN.Text style={styles.cardName}>{card.name}</RN.Text>
        </RN.View>
      </RN.TouchableOpacity>
    ),
    [navigateToMovie],
  );
  return (
    <Container isScroll={true}>
      <Carousel
        data={slidersData}
        renderItem={renderItem}
        fistImage={
          <RN.View w={sizes.width * 0.87} h={sizes.width * 0.8} ai={'center'}>
            <RN.Image
              source={slidersData[0]?.source}
              style={styles.movieImage}
              contentFit={'cover'}
            />
            <RN.Text style={styles.cardName}>{slidersData[0]?.name}</RN.Text>
          </RN.View>
        }
        width={SIZES.width}
        height={SIZES.width * 0.85}
      />
      <CardHorizantalFilter
        categories={categoriesList ?? []}
        selectedCategoryId={selectedCategoryId}
        updateSelectedCategoryId={setSelectedCategoryId}
      />
      <MovieList data={allMovies || []} loading={isLoading} />
    </Container>
  );
}

const styles = RN.StyleSheet.create({
  movieImage: {
    borderRadius: 11,
    width: sizes.width * 0.6,
    height: sizes.height * 1,
  },
  cardName: {
    fontSize: 17,
    fontFamily: InterFonts.Inter_600,
    color: COLORS.white2,
    position: 'absolute',
    zIndex: 2,
    bottom: -30,
    textAlign: 'center',
  },
});
