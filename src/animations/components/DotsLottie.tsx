import { useMemo } from 'react';
import LottieContants from '../constants/Lottie.contants';
import { updateLottieColor } from '../constants/utils';
import LottieComponenet from './LottieComponent';
import { COLORS, hexToRgb } from '@/shared/constants/colors';

const DotsLottie = () => {
  const color = useMemo(() => hexToRgb(COLORS.orange), []);
  const updatedAnimation = useMemo(
    () => updateLottieColor(LottieContants.Dots, color),
    [color],
  );
  return (
    <LottieComponenet
      // @ts-expect-error
      source={updatedAnimation}
      loop={true}
      autoPlay={true}
      width={300}
      height={300}
    />
  );
};

export default DotsLottie;
