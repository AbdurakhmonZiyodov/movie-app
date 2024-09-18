import RN from '@/components/RN';
import { COLORS } from '@/shared/constants/colors';
import { UseVisibility } from '@/shared/hooks/useVisibility';
import { FontAwesome6 as FontAwesomeIcon } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { RNVideoVerticalSlider } from '.';
import AngleLeftIcon from '../../../../assets/images/AngleLeftIcon';
import AngleRightIcon from '../../../../assets/images/AngleRightIcon';
import BrightIcon from '../../../../assets/images/BrightIcon';
import SoundIcon from '../../../../assets/images/SoundIcon';
import { styles } from '../styles';

interface CentrialControllsProps {
  volume: number;
  bright: number;
  onChangeVolume(value: number): void;
  onChangeBright(value: number): void;
  onCompleteVolume?(value: number): void;
  onCompleteBright?(value: number): void;
  playVisiblity: UseVisibility;
  onForward?: () => void;
  onBackward?: () => void;
  isShowVolume?: boolean;
  isShowBright?: boolean;
  isLock?: boolean;
}

function CentrialControlls({
  volume,
  bright,
  onChangeVolume,
  onCompleteVolume,
  onChangeBright,
  onCompleteBright,
  playVisiblity,
  onForward,
  onBackward,
  isShowVolume = false,
  isShowBright = false,
  isLock = false,
}: CentrialControllsProps) {
  return (
    <RN.View
      style={[RN.StyleSheet.absoluteFill, styles.centrialControllsContainer]}
    >
      {!isLock && (
        <RN.View style={styles.volumeSliderContainer}>
          <RNVideoVerticalSlider
            value={volume}
            onChangeValue={onChangeBright}
            onComplete={onCompleteBright}
            renderIcon={() => (
              <SoundIcon
                style={[styles.controllIcon, { left: 'auto', right: 20 }]}
              />
            )}
            isShowVisible={isShowVolume}
            isLeftSide={true}
          />
        </RN.View>
      )}

      {!isLock && (
        <Animated.View style={[styles.backwardIcon]}>
          <RN.TouchableOpacity onPress={onBackward}>
            <AngleLeftIcon size={50} />
          </RN.TouchableOpacity>
        </Animated.View>
      )}

      {!isLock && (
        <RN.TouchableOpacity onPress={playVisiblity.toggle}>
          {!playVisiblity.visible ? (
            <FontAwesomeIcon name={'pause'} color={COLORS.white} size={50} />
          ) : (
            <FontAwesomeIcon name={'play'} color={COLORS.white} size={50} />
          )}
        </RN.TouchableOpacity>
      )}

      {!isLock && (
        <RN.View style={styles.brightSliderContainer}>
          <RNVideoVerticalSlider
            value={bright}
            isShowVisible={isShowBright}
            onChangeValue={onChangeVolume}
            onComplete={onCompleteVolume}
            renderIcon={() => <BrightIcon style={styles.controllIcon} />}
          />
        </RN.View>
      )}

      {!isLock && (
        <Animated.View style={[styles.forwardIcon]}>
          <RN.TouchableOpacity onPress={onForward}>
            <AngleRightIcon size={50} />
          </RN.TouchableOpacity>
        </Animated.View>
      )}
    </RN.View>
  );
}

export default CentrialControlls;
