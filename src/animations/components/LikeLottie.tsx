import {
  default as AnimatedLottieView,
  default as Lottie,
} from 'lottie-react-native';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LottieContants from '../constants/Lottie.contants';
import { styles } from './LottieComponent.styles';
import useVisibility from '@/shared/hooks/useVisibility';
import RN from '@/components/RN';

interface LikeLottieProps {
  width: number;
  height: number;
  style?: StyleProp<ViewStyle>;
}

export interface LikeLottieRefProps {
  onStart?(): void;
  onEnd?(): void;
  onToggle?(): void;
}

const LikeLottie = forwardRef<LikeLottieRefProps, LikeLottieProps>(
  ({ width, height, style }, ref) => {
    const buttonRef = useRef<AnimatedLottieView>(null);
    const visiblity = useVisibility(false);

    const onStart = useCallback(() => {
      buttonRef.current?.play(10, 10);
      visiblity.hide();
    }, [visiblity]);

    const onEnd = useCallback(() => {
      buttonRef.current?.play(10, 38);
      visiblity.show();
    }, [visiblity]);

    const onToggle = useCallback(
      () => (visiblity.visible ? onStart() : onEnd()),
      [onEnd, onStart, visiblity.visible],
    );

    useImperativeHandle(ref, () => ({ onStart, onEnd, onToggle }));

    return (
      <RN.View style={styles.container}>
        <Lottie
          loop={false}
          autoPlay={false}
          ref={buttonRef}
          speed={2}
          source={LottieContants.Like}
          style={[{ width, height }, style]}
        />
      </RN.View>
    );
  },
);

LikeLottie.displayName = 'LikeLottie';

export default LikeLottie;
