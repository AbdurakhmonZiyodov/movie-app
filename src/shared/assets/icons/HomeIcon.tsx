import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

export default function HomeIcon({ color, size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox={'0 0 24 24'} fill={'none'}>
      <Path
        d={
          'M9.02 2.84001L3.63 7.04001C2.73 7.74001 2 9.23001 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29001 21.19 7.74001 20.2 7.05001L14.02 2.72001C12.62 1.74001 10.37 1.79001 9.02 2.84001Z'
        }
        stroke={color}
        strokeWidth={'1.5'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <Path d={'M12 17.99V14.99V17.99Z'} fill={color} />
      <Path
        d={'M12 17.99V14.99'}
        stroke={color}
        strokeWidth={'1.5'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </Svg>
  );
}
