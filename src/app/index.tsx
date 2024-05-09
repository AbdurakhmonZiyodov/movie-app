import RN from '@/components/RN';
import { onBoardingImageWebp } from '@/shared/assets/images';
import { COLORS } from '@/shared/constants/colors';
import { SIZES } from '@/shared/constants/dimensions';

const OnBoardingScreen = () => (
  <RN.View style={styles.container}>
    <RN.Image
      source={onBoardingImageWebp}
      style={styles.image}
      contentFit={'contain'}
    />
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
  },
});

export default OnBoardingScreen;
