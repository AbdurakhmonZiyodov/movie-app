import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export default function SliderIcon({ color, size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox={'0 0 24 24'} fill={'none'}>
      <Path
        d={
          'M16.5 12C18.1569 12 19.5 10.6569 19.5 9C19.5 7.34315 18.1569 6 16.5 6M16.5 12C14.8431 12 13.5 10.6569 13.5 9C13.5 7.34315 14.8431 6 16.5 6M16.5 12V20M16.5 6V4M8.5 18C10.1569 18 11.5 16.6569 11.5 15C11.5 13.3431 10.1569 12 8.5 12M8.5 18C6.84315 18 5.5 16.6569 5.5 15C5.5 13.3431 6.84315 12 8.5 12M8.5 18L8.5 20M8.5 12V4'
        }
        stroke={color}
        strokeWidth={'2'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </Svg>
  );
}
