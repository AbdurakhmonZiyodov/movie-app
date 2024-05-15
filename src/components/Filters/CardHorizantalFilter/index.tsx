import RN from '@/components/RN';
import { MontserratFonts } from '@/shared/assets/fonts/montserrat.fonts';
import { COLORS } from '@/shared/constants/colors';
import { isEqual } from 'lodash';
import { useCallback } from 'react';
import { ListRenderItem } from 'react-native';

const allMovieId = Symbol(
  'This is a unique type for outputting all files, which will not be sent to the backend',
).toString();
export default function CardHorizantalFilter({
  categories,
  selectedCategoryId,
  updateSelectedCategoryId,
}: {
  categories: {
    id: string;
    name: string;
  }[];
  selectedCategoryId: string | null;
  updateSelectedCategoryId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const onPressFilter = useCallback(
    ({ id }: { id: string }) => {
      if (id === allMovieId) {
        updateSelectedCategoryId(null);
      } else {
        updateSelectedCategoryId(id);
      }
    },
    [updateSelectedCategoryId],
  );

  const renderItem: ListRenderItem<(typeof categories)[0]> = useCallback(
    ({ item: filter }) => (
      <RN.TouchableOpacity
        style={styles.filterButton}
        onPress={() => onPressFilter({ id: filter.id })}
      >
        <RN.Text
          style={[
            styles.filterText,
            isEqual(selectedCategoryId, filter.id) && styles.activeFilterText,
          ]}
        >
          {filter.name}
        </RN.Text>
      </RN.TouchableOpacity>
    ),
    [onPressFilter, selectedCategoryId],
  );
  return (
    <RN.View>
      <RN.FlatList
        horizontal={true}
        contentContainerStyle={styles.flatList}
        keyExtractor={(_, key) => key.toString()}
        data={[{ name: 'All', id: allMovieId }, ...categories]}
        renderItem={renderItem}
      />
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  filterText: {
    fontSize: 17,
    fontFamily: MontserratFonts.Montserrat_600,
    color: COLORS.white,
    textTransform: 'uppercase',
  },
  filterButton: {
    paddingVertical: 5,
  },
  activeFilterText: {
    color: COLORS.orange,
  },
  flatList: {
    gap: 20,
  },
});
