import RN from '@/components/RN';
import { MontserratFonts } from '@/shared/assets/fonts/montserrat.fonts';
import { onBoardingImageWebp } from '@/shared/assets/images';
import { COLORS } from '@/shared/constants/colors';
import { SIZES, normalizeHeight } from '@/shared/constants/dimensions';

const OnBoardingScreen = () => (
  <RN.View style={styles.container}>
    <RN.Image
      source={onBoardingImageWebp}
      style={styles.image}
      contentFit={'contain'}
    />
    <RN.View g={10}>
      <RN.Text style={styles.logo}>{'Animate Movie'}</RN.Text>
      <RN.Text style={styles.description}>
        {"O'zingiz xohlagan hamma narsani tomosha qiling!"}
      </RN.Text>
    </RN.View>
  </RN.View>
);

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  image: {
    width: '100%',
    height: SIZES.height * 0.7,
    marginTop: 30,
  },
  logo: {
    fontSize: 32,
    fontFamily: MontserratFonts.Montserrat_700,
    color: COLORS.white,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  description: {
    fontSize: normalizeHeight(16),
    lineHeight: normalizeHeight(20),
    fontFamily: MontserratFonts.Montserrat_400,
    color: COLORS.white,
    textAlign: 'center',
    width: '60%',
    alignSelf: 'center',
  },
});

export default OnBoardingScreen;
