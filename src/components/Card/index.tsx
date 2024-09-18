import LikeLottie, {
  LikeLottieRefProps,
} from '@/animations/components/LikeLottie';
import config from '@/config';
import { MontserratFonts } from '@/shared/assets/fonts/montserrat.fonts';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { PremiumImagePng } from '@/shared/assets/images';
import { addAlpha, COLORS } from '@/shared/constants/colors';
import { normalizeWidth, SIZES } from '@/shared/constants/dimensions';
import { HIT_SLOP } from '@/shared/styles/globalStyles';
import { MovieType } from '@/shared/types';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { join, map } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';
import RN from '../RN';

export interface CardProps extends MovieType {
  isVisibileOfCategory?: boolean;
}

const cardWidth = Math.min(SIZES.width * 0.42 - 25, 180);
const cardHeight = cardWidth * 1.5;

function Card({
  status_type,
  images,
  name,
  movie_genre,
  id,
  isVisibileOfCategory = false,
}: CardProps) {
  const likeRef = useRef<LikeLottieRefProps>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && likeRef.current) {
      likeRef.current.onStart?.();
    }
  }, [isFocused]);

  const [movieImageUrl, isPremium] = useMemo(
    () => [config.IMAGE_URL + `/${images[0]}`, status_type === 'premium'],
    [images, status_type],
  );

  const navigateToMovie = useCallback(() => {
    router.navigate(`/movie/${id}`);
  }, [id]);
  return (
    <DropShadow style={styles.shadowContainer}>
      <RN.TouchableOpacity
        style={styles.container}
        activeOpacity={0.5}
        onPress={navigateToMovie}
      >
        {isPremium && (
          <RN.Image source={PremiumImagePng} style={styles.premiumImage} />
        )}
        {!!movieImageUrl && (
          <RN.View>
            <RN.Image
              source={{ uri: movieImageUrl }}
              style={styles.movieImage}
              contentFit={'cover'}
            />
            <RN.TouchableOpacity
              style={styles.iconContainer}
              hitSlop={HIT_SLOP}
              activeOpacity={0.5}
              onPress={() => {
                console.log('toggle');
                likeRef.current?.onToggle?.();
              }}
            >
              <LikeLottie ref={likeRef} width={40} height={40} />
            </RN.TouchableOpacity>
          </RN.View>
        )}
        <RN.View flex={1}>
          <LinearGradient
            useAngle={true}
            angle={360}
            locations={[0, 1]}
            colors={[addAlpha(COLORS.dark, 0.2), addAlpha(COLORS.white, 0.1)]}
            style={[
              RN.StyleSheet.absoluteFill,
              {
                flex: 1,
                zIndex: 1,
                justifyContent: 'center',
              },
            ]}
          >
            {!!name && (
              <RN.Text style={styles.movieName} numberOfLines={2}>
                {name}
              </RN.Text>
            )}
            {!!movie_genre && isVisibileOfCategory && (
              <RN.Text style={styles.movieCategories} numberOfLines={2}>
                {join(
                  map(movie_genre, (i) => i.name),
                  ' / ',
                )}
              </RN.Text>
            )}
          </LinearGradient>
        </RN.View>
      </RN.TouchableOpacity>
    </DropShadow>
  );
}

const MemorizedCard = memo(Card);
export default MemorizedCard;

const styles = RN.StyleSheet.create({
  movieImage: {
    width: cardWidth - 2,
    height: cardHeight * 0.7,
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  movieName: {
    color: COLORS.white,
    fontSize: 13,
    fontFamily: PoppinsFonts.Poppins_400,
    paddingVertical: 3,
    paddingTop: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  movieCategories: {
    color: COLORS.orange,
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: MontserratFonts.Montserrat_500,
    paddingHorizontal: 5,
  },
  premiumImage: {
    position: 'absolute',
    width: normalizeWidth(65),
    height: normalizeWidth(25),
    zIndex: 2,
    left: 4,
    top: 4,
  },
  container: {
    flexGrow: 1,
    width: cardWidth,
    maxWidth: cardWidth,
    minHeight: cardHeight,
    backgroundColor: COLORS.dark,
    borderRadius: 11,
    borderWidth: 0.5,
    borderColor: COLORS.black2,
  },
  iconContainer: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 30,
    height: 30,
    backgroundColor: COLORS.black2,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowContainer: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderRadius: 11,
    backgroundColor: 'transparent',
  },
});
