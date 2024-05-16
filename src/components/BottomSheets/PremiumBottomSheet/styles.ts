import RN from '@/components/RN';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS, addAlpha } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';

export const styles = RN.StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  preModalPaymentButton: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS.black2,
    width: '47%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.black2,
  },
  activePreModalPaymentButton: {
    borderColor: COLORS.orange,
  },
  preModalPaymentButtonTitle: {
    fontSize: normalizeHeight(20),
    fontFamily: PoppinsFonts.Poppins_600,
    color: COLORS.white,
    textAlign: 'center',
  },
  preModalPaymentButtonSubTitle: {
    fontSize: normalizeHeight(18),
    fontFamily: PoppinsFonts.Poppins_300,
    color: COLORS.white,
    textAlign: 'center',
  },
  flatList: {
    gap: 6,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: addAlpha(COLORS.black2, 0.5),
    paddingVertical: 20,
    marginBottom: 20,
    alignItems: 'flex-start',
    paddingLeft: 15,
    height: 75,
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: addAlpha(COLORS.black2, 0.5),
  },
});
