import RN from '@/components/RN';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { findIndex, isEqual } from 'lodash';
import { memo, useCallback } from 'react';
import { ListRenderItem } from 'react-native';

interface EpisodeListProps {
  data: any[];
  index: number;
  setIndex: (index: number) => void;
}

function EpisodeList({ data = [], index, setIndex }: EpisodeListProps) {
  const renderSmallButton: ListRenderItem<{
    id: string;
    name: string;
    movie_type: string;
  }> = useCallback(
    ({ item: movie, index: idx }) => {
      const isActive = isEqual(findIndex(data, { id: movie.id }), index);

      return (
        <RN.TouchableOpacity
          style={[styles.smallButton, isActive && styles.activeSmallButton]}
          onPress={() => {
            setIndex(idx);
          }}
        >
          <RN.Text
            style={[
              styles.smallButtonText,
              isActive && styles.activeSmallButtonText,
            ]}
          >
            {`${movie.name}`}
          </RN.Text>
        </RN.TouchableOpacity>
      );
    },
    [data, index, setIndex],
  );

  return (
    <RN.FlatList
      data={data}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, key) => `key-${key}`}
      contentContainerStyle={styles.smallButtonGroup}
      renderItem={renderSmallButton}
    />
  );
}

const styles = RN.StyleSheet.create({
  smallButtonGroup: {
    gap: 10,
    paddingTop: 18,
    paddingBottom: 20,
  },
  activeSmallButton: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  smallButtonText: {
    fontSize: normalizeHeight(16),
    color: COLORS.black3,
    fontFamily: PoppinsFonts.Poppins_300,
  },
  activeSmallButtonText: {
    color: COLORS.white,
  },
  smallButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: COLORS.black2,
    borderColor: COLORS.black2,
  },
});

export default memo(EpisodeList);
