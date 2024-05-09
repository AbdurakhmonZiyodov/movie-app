import { MockUserImagePng } from '@/shared/assets/mock/images';
import RN from '../RN';
import { SIZES, normalizeWidth } from '@/shared/constants/dimensions';
import { COLORS } from '@/shared/constants/colors';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { MontserratFonts } from '@/shared/assets/fonts/montserrat.fonts';
import { PremiumImagePng } from '@/shared/assets/images';
import { useEffect } from 'react';

export interface CardProps {
  isPremium?: boolean;
}

export default function Card({ isPremium = false }: CardProps) {
  useEffect(() => {
    if (isPremium) {
      console.log({ isPremium });
    }
  }, []);
  return (
    <RN.TouchableOpacity activeOpacity={0.5}>
      {isPremium && (
        <RN.Image source={PremiumImagePng} style={styles.premiumImage} />
      )}







      <RN.Image source={MockUserImagePng} style={styles.movieImage} />
      <RN.Text style={styles.movieName}>{'Jujutsu Kaisen'}</RN.Text>
      <RN.Text style={styles.movieCategories}>
        {'Maktab / Romantik / drama'}
      </RN.Text>
    </RN.TouchableOpacity>
  );
}

const styles = RN.StyleSheet.create({
  movieImage: {
    width: SIZES.width * 0.5 - 30,
    height: 220,
    borderRadius: 11,
    overflow: 'hidden',
  },
  movieName: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: PoppinsFonts.Poppins_500,
    paddingVertical: 3,
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
    resizeMode: 'contain',
    left: 5,
    top: 5,
  },
});
