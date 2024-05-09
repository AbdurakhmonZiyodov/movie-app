import { getInterFonts } from "./inter.fonts";
import { getMontserratFonts } from "./montserrat.fonts";

export const getAllFonts = () =>
  Object.assign({}, getInterFonts(), getMontserratFonts());
