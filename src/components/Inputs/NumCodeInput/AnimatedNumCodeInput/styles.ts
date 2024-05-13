import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS, addAlpha } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { StyleSheet } from 'react-native';

export const CELL_SIZE = 55;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = addAlpha(COLORS.dark, 0.5);
export const NOT_EMPTY_CELL_BG_COLOR = COLORS.orange;
export const ACTIVE_CELL_BG_COLOR = addAlpha(COLORS.dark, 0.5);

const styles = StyleSheet.create({
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cellText: {
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    fontSize: 30,
    textAlign: 'center',
    color: COLORS.orange,
  },
  cell: {
    marginHorizontal: 8,
    backgroundColor: COLORS.black2,
    // IOS
    shadowColor: COLORS.orange,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
  title: {
    fontSize: normalizeHeight(22),
    fontFamily: PoppinsFonts.Poppins_600,
    color: COLORS.white,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: normalizeHeight(14),
    fontFamily: PoppinsFonts.Poppins_400,
    color: addAlpha(COLORS.white, 0.7),
    textAlign: 'center',
  },
  subBoldTitle: {
    fontFamily: PoppinsFonts.Poppins_600,
    color: COLORS.orange,
  },
});

export default styles;
