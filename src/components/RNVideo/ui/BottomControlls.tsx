import RN from '@/components/RN';
import { styles } from '../styles';
import LockIcon from '../../../../assets/images/LockIcon';
import { CoreStyle } from '@/shared/styles/globalStyles';
import { RNVideoHorizantalSlider } from '.';
import ExpandIcon from '../../../../assets/images/ExpandIcon';
import { UseVisibility } from '@/shared/hooks/useVisibility';
import { calculateTime } from '../utils';
import { SliderOnChangeCallback } from '@miblanchard/react-native-slider/lib/types';

interface BottomControllsProps {
  lockVisiblity: UseVisibility;
  currentTime: number;
  duration: number;
  onChangeVideoDuration: SliderOnChangeCallback;
  onExpandHandler(): void;
  expandVisiblity: UseVisibility;
  isLock?: boolean;
}

export default function BottomControlls({
  lockVisiblity,
  currentTime,
  duration,
  onChangeVideoDuration,
  onExpandHandler,
  expandVisiblity,
}: BottomControllsProps) {
  return (
    <RN.View style={styles.bottomControllsContainer}>
      <RN.View jc={'flex-end'} fd={'row'} pb={10}>
        <RN.TouchableOpacity activeOpacity={0.5} onPress={lockVisiblity.toggle}>
          <LockIcon isLock={lockVisiblity.visible} />
        </RN.TouchableOpacity>
      </RN.View>

      {!lockVisiblity.visible && (
        <RN.View style={CoreStyle.row} jc={'space-between'}>
          <RN.View flex={1} fd={'row'} ai={'center'} g={5}>
            <RN.Text style={styles.time}>{calculateTime(currentTime)}</RN.Text>
            <RNVideoHorizantalSlider
              minVlaue={0}
              maxVlaue={duration}
              value={currentTime}
              onChangeValue={onChangeVideoDuration}
            />
            <RN.Text style={styles.time}>{calculateTime(duration)}</RN.Text>
          </RN.View>
          <RN.TouchableOpacity activeOpacity={0.5} onPress={onExpandHandler}>
            <ExpandIcon expanded={!expandVisiblity.visible} />
          </RN.TouchableOpacity>
        </RN.View>
      )}
    </RN.View>
  );
}
