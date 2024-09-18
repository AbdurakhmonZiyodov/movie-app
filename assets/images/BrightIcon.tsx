import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function BrightIcon(props: any) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox={'0 0 24 24'}
      fill={'none'}
      {...props}
    >
      <Circle cx={12} cy={12} r={5} stroke={props.color} strokeWidth={1.5} />
      <Path
        d={
          'M12 2v2M12 20v2M20.66 7l-1.732 1M5.072 16L3.34 17M3.34 7l1.732 1M18.928 16l1.732 1'
        }
        stroke={props.color}
        strokeWidth={1.5}
        strokeLinecap={'round'}
      />
    </Svg>
  );
}

BrightIcon.defaultProps = {
  size: 24,
  color: '#fff',
};

export default BrightIcon;
