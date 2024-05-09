export const COLORS = {
  dark: "#000000",
  black: "#18181B",
  black2: "#262626",
  black3: "#656565",
  white: "#FFFFFF",
  orange: "#FF3D00",
  gray: "#9DB2CE",
};

// hex's length should be 6 (#000000)
export const addAlpha = (hex: string, alpha: number) =>
  `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;
