import { getInterFonts } from './inter.fonts';
import { getMontserratFonts } from './montserrat.fonts';
import { getPoppinsFonts } from './poppins.fonts';

export const getAllFonts = () =>
  Object.assign({}, getInterFonts(), getMontserratFonts(), getPoppinsFonts());
