import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ExpandIcon(props: any) {
  return (
    <Svg
      width={props.size}
      height={props.size}
      viewBox={'0 0 24 24'}
      fill={'none'}
      {...props}
    >
      {props.expanded ? (
        <Path
          d={
            'M7.635 3h-5v5m13 13h2m0 0h3m-3 0h3m0 0v-3m0 3v-3m0 0v-2m-18 0v5h5M20.65 8.013l.005-2 .008-3-3-.008-2-.005'
          }
          stroke={'#fff'}
          strokeWidth={2}
          strokeMiterlimit={16}
          strokeLinecap={'round'}
        />
      ) : (
        <Path
          d={
            'M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3'
          }
          stroke={'#fff'}
          strokeWidth={2}
          strokeLinecap={'round'}
          strokeLinejoin={'round'}
        />
      )}
    </Svg>
  );
}

ExpandIcon.defaultProps = {
  size: 24,
};

export default ExpandIcon;
