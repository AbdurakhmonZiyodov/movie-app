import { getInterFonts } from './inter.fonts';
import { getMontserratFonts } from './montserrat.fonts';
import { getOpenSansFonts } from './open-sans.fonts';
import { getPoppinsFonts } from './poppins.fonts';
import { getSourceSansProFonts } from './source-sans-pro.fonts';

export const getAllFonts = () =>
  Object.assign(
    {},
    getInterFonts(),
    getMontserratFonts(),
    getPoppinsFonts(),
    getOpenSansFonts(),
    getSourceSansProFonts(),
  );
