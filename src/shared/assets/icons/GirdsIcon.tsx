import Svg, { Path } from "react-native-svg";
import { IconProps } from "./types";
export default function GirdsIcon({ color, size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
        stroke={color}
      />
      <Path
        d="M3.41003 22.5C3.41003 18.722 7.17163 15.5 12 15.5C16.8284 15.5 20.59 18.722 20.59 22.5H3.41003Z"
        stroke={color}
      />
    </Svg>
  );
}
