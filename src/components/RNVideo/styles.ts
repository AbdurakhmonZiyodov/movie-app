import { COLORS } from '@/shared/constants/colors';
import RN from '../RN';
import { normalizeHeight, normalizeWidth } from '@/shared/constants/dimensions';

export const BASE_PADDING = 15;

export const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  video: {
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  videoContainer: {
    height: normalizeHeight(300),
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: BASE_PADDING,
    zIndex: 2,
  },
  loading: {
    zIndex: 222,
    backgroundColor: COLORS.dark,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  brightSliderContainer: {
    position: 'absolute',
    right: -BASE_PADDING * 1.5,
    columnGap: 5,
    zIndex: 1,
  },
  volumeSliderContainer: {
    position: 'absolute',
    left: -BASE_PADDING * 1.5,
    columnGap: 5,
    zIndex: 1,
  },
  centrialControllsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 10,
  },
  bottomControllsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: BASE_PADDING,
  },
  time: {
    fontSize: 10,
    color: COLORS.white,
  },
  backwardIcon: {
    tintColor: COLORS.white,
    position: 'absolute',
    resizeMode: 'contain',
    left: normalizeWidth(BASE_PADDING * 5),
    zIndex: 2,
  },
  forwardIcon: {
    position: 'absolute',
    resizeMode: 'contain',

    right: normalizeWidth(BASE_PADDING * 5),
    zIndex: 2,
  },
  controllIcon: {
    position: 'absolute',
    left: 20,
    top: -20,
  },
});
