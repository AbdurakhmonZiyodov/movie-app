import { Slider } from '@miblanchard/react-native-slider';
import { SliderOnChangeCallback } from '@miblanchard/react-native-slider/lib/types';

import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

interface HorizantalSliderProps {
  minVlaue?: number;
  maxVlaue?: number;
  value?: number;
  onChangeValue: SliderOnChangeCallback;
  containerStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
}

export default function HorizantalSlider({
  minVlaue,
  value,
  maxVlaue,
  onChangeValue,
  containerStyle,
  thumbStyle,
  trackStyle,
}: HorizantalSliderProps) {
  return (
    <Slider
      minimumValue={minVlaue}
      maximumValue={maxVlaue}
      value={value}
      minimumTrackTintColor={'#4E4698'}
      maximumTrackTintColor={'rgba(255,255,255,0.15)'}
      thumbTintColor={'#4E4698'}
      onValueChange={onChangeValue}
      containerStyle={{ height: 20, flex: 0.9, ...(containerStyle as object) }}
      thumbStyle={{ width: 15, height: 15, ...(thumbStyle as object) }}
      trackStyle={{ height: 5, ...(trackStyle as object) }}
    />
  );
}
