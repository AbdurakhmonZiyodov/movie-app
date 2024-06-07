import { Button } from '@/components/Button';
import RN from '@/components/RN';
import { MontserratFonts } from '@/shared/assets/fonts/montserrat.fonts';
import { onBoardingImageWebp } from '@/shared/assets/images';
import { COLORS } from '@/shared/constants/colors';
import {
  SIZES,
  normalizeHeight,
  normalizeWidth,
} from '@/shared/constants/dimensions';
import { onForwardOnboarding } from '@/store/LocalStore';
import { useAppDispatch } from '@/store/hooks';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { PUBLIC_STACK } from '../shared/routes';
import useVisibility from '@/shared/hooks/useVisibility';

const OnBoardingScreen = () => {
  const dispatch = useAppDispatch();
  const loading = useVisibility();

  const onGoNextScreen = useCallback(() => {
    loading.show();
    setTimeout(() => {
      dispatch(onForwardOnboarding());
      router.replace(PUBLIC_STACK.login);
      loading.hide();
    }, 350);
  }, [dispatch, loading]);

  return (
    <RN.View style={styles.container}>
      <RN.Image
        source={onBoardingImageWebp}
        style={styles.image}
        contentFit={'contain'}
      />
      <RN.View g={10}>
        <RN.Text style={styles.logo}>{'Banana TV'}</RN.Text>
        <RN.Text style={styles.description}>
          {"O'zingiz xohlagan hamma narsani tomosha qiling!"}
        </RN.Text>
        <Button
          title={'Oldinga'}
          style={styles.goButton}
          loading={loading.visible}
          onPress={onGoNextScreen}
          RightSection={
            <RN.View pl={6}>
              <Ionicons name={'arrow-forward'} size={24} color={COLORS.white} />
            </RN.View>
          }
        />
      </RN.View>
    </RN.View>
  );
};

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
  goButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: normalizeWidth(16),
    width: SIZES.width - normalizeWidth(16) * 2,
    marginTop: 10,
  },
});

export default OnBoardingScreen;
