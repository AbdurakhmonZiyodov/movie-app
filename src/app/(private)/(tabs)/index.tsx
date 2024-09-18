import Carousel from '@/components/Carousel';
import Container from '@/components/Container';
import MoviesSection from '@/components/MoviesSection';
import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import config from '@/config';
import { InterFonts } from '@/shared/assets/fonts/inter.fonts';
import { COLORS } from '@/shared/constants/colors';
import { normalizeWidth, SIZES } from '@/shared/constants/dimensions';
import { DEBUG } from '@/shared/constants/global';
import useVisibility from '@/shared/hooks/useVisibility';
import { CoreStyle } from '@/shared/styles/globalStyles';
import { useMovieSlidesQuery } from '@/store/services/features/MovieApi';
import { router } from 'expo-router';
import { map } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { RefreshControl } from 'react-native';
import type { CarouselRenderItem } from 'react-native-reanimated-carousel';

const sizes = {
  width: SIZES.width * 1,
  height: SIZES.width * 1 * 0.8,
};
export default function HomeScreen() {
  const refreshControlVisible = useVisibility();

  const {
    data: sliders,
    isLoading: slidersLoading,
    refetch: refetchOfSliders,
  } = useMovieSlidesQuery();

  const slidersData = useMemo(
    () =>
      map(sliders || [], (slide) => ({
        id: slide.id,
        name: slide.name,
        source: { uri: config.IMAGE_URL + '/' + slide.images[0] },
      })),
    [sliders],
  );

  const onRefresh = useCallback(async () => {
    try {
      refreshControlVisible.show();
      await Promise.allSettled([refetchOfSliders()]).then(() => {
        setTimeout(refreshControlVisible.hide, 400);
      });
    } catch (err) {
      if (DEBUG) console.error(err);
    }
  }, [refetchOfSliders, refreshControlVisible]);

  const allLoading = useMemo(() => slidersLoading, [slidersLoading]);

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
          <RN.Text style={styles.cardName} numberOfLines={2}>
            {card.name}
          </RN.Text>
        </RN.View>
      </RN.TouchableOpacity>
    ),
    [navigateToMovie],
  );

  if (allLoading) {
    return (
      <Container style={CoreStyle.center}>
        <RN.ActivityIndicator size={'large'} color={COLORS.white} />
      </Container>
    );
  }
  return (
    <Container
      edges={['top']}
      isScroll={true}
      style={{
        paddingVertical: 0,
        marginVertical: 0,
        paddingHorizontal: 0,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshControlVisible.visible}
          onRefresh={onRefresh}
          tintColor={COLORS.white}
          colors={[COLORS.black, COLORS.orange, COLORS.black]}
        />
      }
    >
      <RN.View style={styles.withPadding}>
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
              <RN.Text style={styles.cardName} numberOfLines={1}>
                {slidersData[0]?.name}
              </RN.Text>
            </RN.View>
          }
          width={SIZES.width}
          height={SIZES.width * 0.88}
        />
      </RN.View>

      <Spacing steps={2} />

      <MoviesSection />
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
    fontSize: 16,
    fontFamily: InterFonts.Inter_600,
    color: COLORS.white2,
    position: 'absolute',
    zIndex: 2,
    bottom: -40,
    textAlign: 'center',
    width: '70%',
  },
  withPadding: {
    paddingHorizontal: normalizeWidth(16),
  },
});
