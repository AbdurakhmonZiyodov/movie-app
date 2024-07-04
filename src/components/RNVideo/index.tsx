import { FC, useCallback } from 'react';
import Video from './Video';
import { useRNVideo } from './useRNVideo';
import RN from '../RN';
import { map } from 'lodash';
import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import useVisibility from '@/shared/hooks/useVisibility';

interface RNVideoProps {
  id: string;
}

const RNVideo: FC<RNVideoProps> = ({ id }) => {
  const { movieUrl, format, formatList, setFormat } = useRNVideo({ id });
  const loading = useVisibility();

  const onChangeFormat = useCallback(
    (val: number | null) => {
      loading.show();
      setFormat(val);
      setTimeout(loading.hide, 5_000);
    },
    [loading, setFormat],
  );
  return (
    <RN.View>
      <Video uri={movieUrl!} loading={loading.visible} />
      <RN.View style={styles.formatButtonGroup}>
        <RN.TouchableOpacity
          onPress={() => onChangeFormat(null)}
          style={[
            styles.formatButton,
            format === null && styles.formatButtonActive,
          ]}
        >
          <RN.Text
            style={[
              styles.formatButtonText,
              format === null && styles.formatButtonTextActive,
            ]}
          >
            {'Auto'}
          </RN.Text>
        </RN.TouchableOpacity>
        {map(formatList, (val, key) => (
          <RN.TouchableOpacity
            key={`key-${key}`}
            onPress={() => onChangeFormat(val)}
            style={[
              styles.formatButton,
              format === val && styles.formatButtonActive,
            ]}
          >
            <RN.Text
              style={[
                styles.formatButtonText,
                format === val && styles.formatButtonTextActive,
              ]}
            >
              {val}
            </RN.Text>
          </RN.TouchableOpacity>
        ))}
      </RN.View>
    </RN.View>
  );
};

const styles = RN.StyleSheet.create({
  formatButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingBottom: 40,
    paddingTop: 5,
  },
  formatButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 0.6,
    borderColor: COLORS.white,
  },
  formatButtonActive: {
    backgroundColor: COLORS.white,
  },
  formatButtonText: {
    color: COLORS.white,
    fontSize: normalizeHeight(12),
  },
  formatButtonTextActive: {
    color: COLORS.black,
  },
});

export default RNVideo;
