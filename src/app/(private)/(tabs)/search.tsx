import Container from '@/components/Container';
import { FormInput } from '@/components/FormController/FormController';
import MovieList from '@/components/MovieList';
import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import { COLORS } from '@/shared/constants/colors';
import { HIT_SLOP } from '@/shared/styles/globalStyles';
import { useAllMoviesQuery } from '@/store/services/features/MovieApi';
import { FontAwesome as FontAwesomeIcon } from '@expo/vector-icons';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function SearchScreen() {
  const { control, watch } = useForm({
    defaultValues: {
      searchValue: '',
    },
  });
  const search = watch('searchValue');
  const {
    data: allMovies,
    isLoading,
    isFetching,
    refetch,
  } = useAllMoviesQuery({
    params: {
      search,
    },
  });

  return (
    <Container isScroll={true}>
      <FormInput
        control={control}
        name={'searchValue'}
        placeholder={'Qidirish...'}
        RightElement={
          <RN.TouchableOpacity hitSlop={HIT_SLOP} onPress={() => refetch()}>
            <FontAwesomeIcon name={'search'} color={COLORS.white} size={24} />
          </RN.TouchableOpacity>
        }
      />
      <Spacing height={12} />
      <MovieList data={allMovies || []} loading={isLoading || isFetching} />
    </Container>
  );
}
