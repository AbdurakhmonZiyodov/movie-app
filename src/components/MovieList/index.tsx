import { MovieType } from '@/shared/types';
import { FC, memo, useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import RN from '../RN';
import Card from '../Card';
import { COLORS } from '@/shared/constants/colors';

interface MovieListProps {
  data: MovieType[];
  loading?: boolean;
}
const MovieList: FC<MovieListProps> = ({ data = [], loading }) => {
  const renderItem: ListRenderItem<MovieType> = useCallback(
    ({ item: movie }) => <Card {...movie} />,
    [],
  );

  if (loading) {
    return (
      <RN.View flex={1} jc={'center'} pt={100}>
        <RN.ActivityIndicator color={COLORS.orange} />
      </RN.View>
    );
  }
  return (
    <RN.FlatList
      data={data || []}
      renderItem={renderItem}
      numColumns={2}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(movie) => movie.id}
      contentContainerStyle={styles.flatlistContainer}
      columnWrapperStyle={{
        justifyContent: 'space-evenly',
        gap: 15,
      }}
    />
  );
};

const styles = RN.StyleSheet.create({
  flatlistContainer: {
    gap: 15,
    paddingTop: 20,
  },
});

const MemorizedMovieList = memo(MovieList);
export default MemorizedMovieList;
