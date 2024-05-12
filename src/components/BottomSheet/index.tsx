import React, {
  FC,
  ReactNode,
  RefObject,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
} from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SIZES } from '@/shared/constants/dimensions';
import { COLORS, addAlpha } from '@/shared/constants/colors';
import { StyleProp, ViewStyle } from 'react-native';
import useVisibility from '@/shared/hooks/useVisibility';
import RN from '../RN';
import { HIT_SLOP } from '@/shared/styles/globalStyles';

const { height: WINDOW_HEIGHT } = SIZES;

const HEIGHT = WINDOW_HEIGHT;
const bgColors = [addAlpha(COLORS.black, 0.7), addAlpha(COLORS.black, 0)];

const ANIMATION_CONFIGS = {
  damping: 500,
  stiffness: 1000,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 10,
  restSpeedThreshold: 10,
};

export interface BottomSheetRef {
  onShow(): void;
  onHide(): void;
  setScroll(newValue: number): void;
}

interface BottomSheetProps {
  children(prop?: ReactNode): ReactNode;
  Header?: ReactNode;
  backgroundColor: keyof typeof COLORS;
  holderColor?: keyof typeof COLORS;
  defaultY?: number;
  isFullHeight?: boolean;
  bottomSheetRef?: RefObject<BottomSheetRef>;
  fromZero?: boolean;
  maxYPosition?: number;
  isDrag?: boolean;
  onClose?(): void;
  containerStyle?: StyleProp<ViewStyle>;
}

interface ScrollToProps {
  value: number;
  afterAnimation?: () => void;
  beforeAnimation?: () => void;
}

const BottomSheet: FC<BottomSheetProps> = ({
  children,
  Header,
  backgroundColor = 'dark',
  holderColor = 'white',
  defaultY,
  maxYPosition = 0,
  bottomSheetRef,
  fromZero = false,
  isDrag = true,
  onClose,
  containerStyle,
}) => {
  const insets = useSafeAreaInsets();
  const paddingBottom = useMemo(
    () => insets.bottom + 20 || 70,
    [insets.bottom],
  );

  const yPositions = useMemo(
    () => ({
      from: fromZero ? maxYPosition : 0,
      to: fromZero ? HEIGHT : defaultY || WINDOW_HEIGHT * 0.35,
    }),
    [defaultY, fromZero, maxYPosition],
  );
  const MAX_PULL_DOWN = useMemo(() => yPositions.to + 50, [yPositions.to]);
  const offset = useSharedValue(yPositions.to);
  const bottomSheetStatus = useSharedValue<'down' | 'up'>('down');
  const darkBcVisiblity = useVisibility();

  const scrollTo = useCallback(
    ({ value, afterAnimation, beforeAnimation }: ScrollToProps) => {
      'worklet';
      beforeAnimation && runOnJS(beforeAnimation)();
      offset.value = withSpring(value, ANIMATION_CONFIGS, (finished) => {
        if (finished) {
          afterAnimation && runOnJS(afterAnimation)();
          bottomSheetStatus.value = value === yPositions.to ? 'down' : 'up';
        }
      });
    },
    [bottomSheetStatus, offset, yPositions.to],
  );

  const onCloseHandler = useCallback(() => {
    darkBcVisiblity.hide();
    onClose?.();
  }, [darkBcVisiblity, onClose]);

  useImperativeHandle(bottomSheetRef, () => ({
    onShow: () => {
      scrollTo({
        value: maxYPosition,
        beforeAnimation: darkBcVisiblity.show,
      });
    },
    onHide: () => {
      scrollTo({ value: WINDOW_HEIGHT, beforeAnimation: onCloseHandler });
    },
    setScroll: (newValue) => {
      scrollTo({ value: newValue });
    },
  }));

  const pan = Gesture.Pan()
    .onChange((event) => {
      'worklet';
      runOnJS(darkBcVisiblity.show)();
      const offsetDelta = event.changeY + offset.value;
      if (offsetDelta < yPositions.from || offsetDelta > MAX_PULL_DOWN) {
        return;
      }
      if (isDrag) {
        offset.value = offsetDelta;
      }
    })
    .onFinalize(() => {
      if (
        bottomSheetStatus.value === 'down' &&
        offset.value + 30 < yPositions.to
      ) {
        scrollTo({ value: yPositions.from });
        return;
      }

      const position =
        yPositions.from === 0 && bottomSheetStatus.value === 'up'
          ? 30
          : yPositions.to / 2;

      if (offset.value > position) {
        scrollTo({ value: yPositions.to, beforeAnimation: onCloseHandler });
        return;
      }

      if (offset.value < yPositions.to) {
        scrollTo({ value: yPositions.from });
        return;
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const TOP = insets.top + insets.bottom || 40;

    return {
      top: TOP,
      transform: [
        {
          translateY: offset.value,
        },
      ],
    };
  });

  const animatedBackground = useAnimatedStyle(() => {
    const bc = interpolateColor(
      offset.value,
      Object.values(yPositions),
      bgColors,
    );
    return {
      backgroundColor: bc,
    };
  });
  return (
    <>
      {darkBcVisiblity.visible && (
        <Animated.View
          style={[
            styles.darkBc,
            RN.StyleSheet.absoluteFill,
            animatedBackground,
          ]}
        />
      )}

      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor: COLORS[backgroundColor],
              paddingBottom,
            },
            containerStyle,
            animatedStyle,
          ]}
        >
          {!!Header && Header}

          {children(
            <RN.View style={styles.holderContainer} hitSlop={HIT_SLOP}>
              <RN.View
                style={[
                  styles.holder,
                  {
                    backgroundColor: COLORS[holderColor],
                    borderColor: COLORS[holderColor],
                  },
                ]}
              />
            </RN.View>,
          )}
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  header: {},
  darkBc: {
    backgroundColor: addAlpha(COLORS.black, 0.7),
  },
  holder: {
    width: 60,
    height: 4,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderWidth: 1,
  },
  holderContainer: {
    paddingVertical: 12,
    alignSelf: 'center',
  },
});

export default memo(BottomSheet);
