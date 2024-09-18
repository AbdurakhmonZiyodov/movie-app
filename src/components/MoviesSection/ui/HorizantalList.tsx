import Card from '@/components/Card';
import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import { OpenSansFonts } from '@/shared/assets/fonts/open-sans.fonts';
import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { HIT_SLOP } from '@/shared/styles/globalStyles';
import { MovieType } from '@/shared/types';
import { useAllMoviesQuery } from '@/store/services/features/MovieApi';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { ListRenderItem } from 'react-native';

interface HorizantalListProps {
  category: {
    id: string;
    name: string;
  };
}

export default function HorizantalList({ category }: HorizantalListProps) {
  const router = useRouter();

  const { data, isLoading, isError } = useAllMoviesQuery({
    params: {
      category_id: category.id,
    },
  });

  const isEmpty = useMemo(() => !data?.length, [data]);

  const goToNextScreen = useCallback(() => {
    router.navigate({
      pathname: '/movie-of-category',
      params: category,
    });
  }, [category, router]);

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

  if (isEmpty) return null;

  return (
    <RN.View pl={normalizeHeight(16)}>
      <RN.View
        fd={'row'}
        jc={'space-between'}
        ai={'center'}
        pr={normalizeHeight(10)}
      >
        <RN.Text style={styles.title}>{category.name}</RN.Text>
        <RN.TouchableOpacity hitSlop={HIT_SLOP} onPress={goToNextScreen}>
          <Feather name={'arrow-right'} size={24} color={COLORS.white} />
        </RN.TouchableOpacity>
      </RN.View>

      <RN.FlatList
        data={data || []}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(movie) => movie.id}
        horizontal={true}
        contentContainerStyle={styles.container}
      />
      <Spacing height={20} />
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flexGrow: 1,
    columnGap: 15,
  },
  title: {
    fontSize: 15,
    fontFamily: OpenSansFonts.OpenSans_700,
    color: COLORS.white,
    paddingBottom: 5,
  },
});
