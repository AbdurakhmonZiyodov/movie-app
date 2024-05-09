import RN from '@/components/RN';
import { MontserratFonts } from '@/shared/assets/fonts/montserrat.fonts';
import { COLORS } from '@/shared/constants/colors';
import { isEqual } from 'lodash';
import { useCallback } from 'react';
import { ListRenderItem } from 'react-native';

const filers = ['Anime film', 'Anime serial', 'Ongoin'];
export default function CardHorizantalFilter() {
  const activeFilter = filers[0];

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item: filter }) => (
      <RN.TouchableOpacity style={styles.filterButton}>
        <RN.Text
          style={[
            styles.filterText,
            isEqual(activeFilter, filter) && styles.activeFilterText,
          ]}
        >
          {filter}
        </RN.Text>
      </RN.TouchableOpacity>
    ),
    [activeFilter],
  );
  return (
    <RN.View>
      <RN.FlatList
        horizontal={true}
        contentContainerStyle={styles.flatList}
        keyExtractor={(_, key) => key.toString()}
        data={filers}
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
