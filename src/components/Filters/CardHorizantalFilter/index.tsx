import RN from '@/components/RN';
import { MontserratFonts } from '@/shared/assets/fonts/montserrat.fonts';
import { COLORS } from '@/shared/constants/colors';
import { isEqual } from 'lodash';
import { useCallback } from 'react';
import { ListRenderItem } from 'react-native';

const filers = ['Abdurakhmon', 'Alisher'];
export default function CardHorizantalFilter() {
  const activeFilter = filers[0];

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item: filter }) => (
      <RN.TouchableOpacity>
        <RN.Text
          style={[
            styles.filterText,
            isEqual(activeFilter, filter) && styles.activeFilterText,
          ]}
        >
          {filers}
        </RN.Text>
      </RN.TouchableOpacity>
    ),
    [activeFilter],
  );
  return (
    <RN.View>
      <RN.FlatList
        horizontal={true}
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
  activeFilterText: {
    color: COLORS.orange,
  },
});
