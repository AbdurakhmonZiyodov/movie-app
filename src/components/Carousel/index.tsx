import { COLORS, addAlpha } from '@/shared/constants/colors';
import React, { FC, ReactNode, memo } from 'react';
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import type { CarouselRenderItem } from 'react-native-reanimated-carousel';
import RNCarousel from 'react-native-reanimated-carousel';
import RN from '../RN';

type Props<T> = {
  data: T[];
  renderItem: CarouselRenderItem<T>;
  loop?: boolean;
  autoPlay?: boolean;
  onSnapToItem?(index: number): void;
  width: number;
  height: number;
  dotColor?: string;
  fistImage?: ReactNode;
};

export const MemorizedCarousel = memo(Carousel);
export default function Carousel<T>({
  data = [],
  renderItem,
  loop = true,
  autoPlay = true,
  onSnapToItem,
  width,
  height,
  dotColor,
  fistImage,
}: Props<T>) {
  const progressValue = useSharedValue<number>(0);

  return (
    <>
      {data.length > 1 ? (
        <RNCarousel
          vertical={false}
          width={width}
          height={height}
          style={{
            width: width,
          }}
          loop={loop}
          pagingEnabled={true}
          snapEnabled={true}
          autoPlay={autoPlay}
          autoPlayInterval={1500}
          onSnapToItem={onSnapToItem}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          mode={'parallax'}
          modeConfig={{
            parallaxScrollingScale: 0.95,
            parallaxScrollingOffset: 170,
            parallaxAdjacentItemScale: 0.74,
          }}
          data={data}
          renderItem={renderItem}
        />
      ) : (
        fistImage
      )}

      {!!progressValue && (
        <RN.View style={styles.dots}>
          {data.map((_, index) => (
            <PaginationItem
              backgroundColor={dotColor}
              animValue={progressValue}
              index={index}
              key={index}
              isRotate={false}
              length={data.length}
            />
          ))}
        </RN.View>
      )}
    </>
  );
}

interface PaginationType {
  index: number;
  backgroundColor?: string;
  length: number;
  animValue: SharedValue<number>;
  isRotate?: boolean;
}

const DOT_WIDTH = 10;

const PaginationItem: FC<PaginationType> = (props) => {
  const { animValue, index, length, isRotate } = props;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-DOT_WIDTH, 0, DOT_WIDTH];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-DOT_WIDTH, 0, DOT_WIDTH];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <RN.View
      style={[
        styles.dot,
        !!props.backgroundColor && {
          backgroundColor: addAlpha(props.backgroundColor, 0.5),
        },
        {
          transform: [
            {
              rotateZ: isRotate ? '90deg' : '0deg',
            },
          ],
        },
      ]}
    >
      <Animated.View
        style={[
          styles.animatedDot,
          !!props.backgroundColor && {
            backgroundColor: props.backgroundColor,
          },
          animStyle,
        ]}
      />
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 20,
    gap: 8,
  },
  dot: {
    width: 10,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: addAlpha(COLORS.white, 0.5),
    overflow: 'hidden',
  },
  animatedDot: {
    borderRadius: 50,
    backgroundColor: COLORS.white,
    flex: 1,
  },
});
