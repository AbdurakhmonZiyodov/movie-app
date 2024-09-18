import RN from '@/components/RN';
import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import VeticalS from 'rn-vertical-slider';
import { makeFullStyle } from '../utils';

interface VerticalSliderProps {
  value: number;
  onChangeValue(value: number): void;
  onComplete?: (value: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  renderIcon: any;
  isShowVisible?: boolean;
  isLeftSide?: boolean;
}

const COLOR = '#4E4698';
const TRACK_COLOR = 'rgba(255,255,255,0.15)';
export const VERTICAL_SLIDER_WIDTH = 25;
export const VERTICAL_SLIDER_HEIGHT = 140;

function VerticalSlider({
  value,
  onChangeValue,
  containerStyle,
  thumbStyle,
  onComplete,
  trackStyle,
  renderIcon,
  isShowVisible = false,
  isLeftSide = false,
  ...resOfProps
}: VerticalSliderProps) {
  return (
    <>
      <VeticalS
        value={value}
        min={0}
        max={100}
        onChange={onChangeValue}
        onComplete={onComplete}
        width={100}
        height={VERTICAL_SLIDER_HEIGHT}
        step={1}
        {...resOfProps}
        minimumTrackTintColor={'transparent'}
        maximumTrackTintColor={'transparent'}
      />
      {isShowVisible && (
        <>
          {renderIcon?.()}
          <RN.View
            style={[
              styles.indicatorCon,
              isLeftSide && { right: 30, left: 'auto' },
            ]}
          >
            <RN.View style={styles.indicator}>
              <RN.View style={[styles.full, makeFullStyle(value)]} />
            </RN.View>
          </RN.View>
        </>
      )}
    </>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    borderRadius: VERTICAL_SLIDER_WIDTH,
    width: VERTICAL_SLIDER_HEIGHT,
    height: VERTICAL_SLIDER_WIDTH,
  },
  slider: {
    backgroundColor: 'transparent',
    borderRadius: VERTICAL_SLIDER_WIDTH,
    height: '100%',
  },
  full: {
    backgroundColor: COLOR,
  },
  indicator: {
    width: 5,
    height: VERTICAL_SLIDER_HEIGHT,
    backgroundColor: TRACK_COLOR,
    borderRadius: 5,
    marginTop: 5,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  indicatorCon: {
    position: 'absolute',
    left: 30,
    alignItems: 'center',
  },
});

const MemorizedVeticalSlider = memo(VerticalSlider);

export default MemorizedVeticalSlider;
