import { useMovieCategoriesQuery } from '@/store/services/features/MovieApi';
import { useCallback } from 'react';
import { ListRenderItem } from 'react-native';
import RN from '../RN';
import HorizantalList from './ui/HorizantalList';

const MoviesSection = () => {
  const { data: categoriesList, isLoading: categoriesLoading } =
    useMovieCategoriesQuery();

  const renderItem: ListRenderItem<{
    id: string;
    name: string;
  }> = useCallback(({ item }) => <HorizantalList category={item} />, []);

  if (categoriesLoading) {
    return (
      <RN.View>
        <RN.Text>{'Loading...'}</RN.Text>
      </RN.View>
    );
  }

  return (
    <RN.FlatList
      renderItem={renderItem}
      data={categoriesList}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MoviesSection;
