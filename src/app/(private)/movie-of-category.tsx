import BackButton from '@/components/BackButton';
import Card from '@/components/Card';
import Container from '@/components/Container';
import RN from '@/components/RN';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import { COLORS } from '@/shared/constants/colors';
import { MovieType } from '@/shared/types';
import { useAllMoviesQuery } from '@/store/services/features/MovieApi';
import { useRoute } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { ListRenderItem } from 'react-native';

export default function MovieOfCategory() {
  const params = useRoute().params as { id: string; name: string };
  const { data, isLoading, isError } = useAllMoviesQuery({
    params: {
      category_id: params.id,
    },
  });

  const isEmpty = useMemo(() => !data?.length, [data]);

  const renderItem: ListRenderItem<MovieType> = useCallback(
    ({ item: movie }) => <Card {...movie} />,
    [],
  );

  if (isLoading || isError) {
    return (
      <RN.View>
        <RN.Text>{'Loading...'}</RN.Text>
      </RN.View>
    );
  }

  if (isEmpty)
    return (
      <Container>
        <RN.Text style={styles.title}>{'No movies found'}</RN.Text>
      </Container>
    );

  return (
    <Container
      Header={
        <RN.View fd={'row'} ai={'center'}>
          <BackButton />
          <RN.Text style={styles.title}>{params.name}</RN.Text>
        </RN.View>
      }
    >
      <RN.FlatList
        data={data || []}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(movie) => movie.id}
        horizontal={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

const styles = RN.StyleSheet.create({
  title: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: PoppinsFonts.Poppins_700,
  },
  container: {
    flexGrow: 1,
    rowGap: 20,
  },
});
