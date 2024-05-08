import Svg, { Path } from "react-native-svg";
import { IconProps } from "./types";
export default function GirdsIcon({ color, size = 25 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M4 6C4 4.89543 4.89543 4 6 4H9C10.1046 4 11 4.89543 11 6V9C11 10.1046 10.1046 11 9 11H6C4.89543 11 4 10.1046 4 9V6Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <Path
        d="M14 6C14 4.89543 14.8954 4 16 4H19C20.1046 4 21 4.89543 21 6V9C21 10.1046 20.1046 11 19 11H16C14.8954 11 14 10.1046 14 9V6Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <Path
        d="M14 16C14 14.8954 14.8954 14 16 14H19C20.1046 14 21 14.8954 21 16V19C21 20.1046 20.1046 21 19 21H16C14.8954 21 14 20.1046 14 19V16Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <Path
        d="M4 16C4 14.8954 4.89543 14 6 14H9C10.1046 14 11 14.8954 11 16V19C11 20.1046 10.1046 21 9 21H6C4.89543 21 4 20.1046 4 19V16Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
