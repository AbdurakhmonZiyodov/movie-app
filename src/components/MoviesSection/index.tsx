import { COLORS } from '@/shared/constants/colors';
import { useMovieCategoriesQuery } from '@/store/services/features/MovieApi';
import { useCallback } from 'react';
import { ActivityIndicator, ListRenderItem } from 'react-native';
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
    return <ActivityIndicator size={'large'} color={COLORS.white} />;
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
