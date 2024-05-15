import config from '@/config';
import { MontserratFonts } from '@/shared/assets/fonts/montserrat.fonts';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { PremiumImagePng } from '@/shared/assets/images';
import { COLORS } from '@/shared/constants/colors';
import { SIZES, normalizeWidth } from '@/shared/constants/dimensions';
import { MovieType } from '@/shared/types';
import { join, map } from 'lodash';
import { useCallback, useMemo } from 'react';
import RN from '../RN';
import { router } from 'expo-router';

export interface CardProps extends MovieType {}

export default function Card({
  status_type,
  images,
  name,
  movie_genre,
  id,
}: CardProps) {
  const [movieImageUrl, isPremium] = useMemo(
    () => [config.IMAGE_URL + `/${images[0]}`, status_type === 'premium'],
    [images, status_type],
  );

  const navigateToMovie = useCallback(() => {
    router.navigate(`/movie/${id}`);
  }, [id]);
  return (
    <RN.TouchableOpacity activeOpacity={0.5} onPress={navigateToMovie}>
      {isPremium && (
        <RN.Image source={PremiumImagePng} style={styles.premiumImage} />
      )}
      {!!movieImageUrl && (
        <RN.Image
          source={{ uri: movieImageUrl }}
          style={styles.movieImage}
          contentFit={'cover'}
        />
      )}
      {!!name && <RN.Text style={styles.movieName}>{name}</RN.Text>}
      {!!movie_genre && (
        <RN.Text style={styles.movieCategories}>
          {join(
            map(movie_genre, (i) => i.name),
            ' / ',
          )}
        </RN.Text>
      )}
    </RN.TouchableOpacity>
  );
}

const styles = RN.StyleSheet.create({
  movieImage: {
    width: SIZES.width * 0.5 - 25,
    height: 220,
    borderRadius: 11,
    overflow: 'hidden',
  },
  movieName: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: PoppinsFonts.Poppins_500,
    paddingVertical: 3,
    paddingTop: 5,
  },
  movieCategories: {
    color: COLORS.orange,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: MontserratFonts.Montserrat_500,
  },
  premiumImage: {
    position: 'absolute',
    width: normalizeWidth(65),
    height: normalizeWidth(25),
    zIndex: 1,
    left: 4,
    top: 4,
  },
});
