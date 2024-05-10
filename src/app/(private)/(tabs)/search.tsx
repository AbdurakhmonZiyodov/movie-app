import Container from '@/components/Container';
import { TextInput } from '@/components/Inputs/TextInput';
import MovieList from '@/components/MovieList';
import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import { COLORS } from '@/shared/constants/colors';
import { HIT_SLOP } from '@/shared/styles/globalStyles';
import { useAllMoviesQuery } from '@/store/services/features/MovieApi';
import { FontAwesome as FontAwesomeIcon } from '@expo/vector-icons';
import React, { useState } from 'react';

export default function SearchScreen() {
  const { data: allMovies, isLoading } = useAllMoviesQuery();
  const [search, setSearch] = useState('');
  return (
    <Container>
      <TextInput
        placeholder={'Qidirish...'}
        value={search}
        onChangeText={setSearch}
        RightElement={
          <RN.TouchableOpacity hitSlop={HIT_SLOP}>
            <FontAwesomeIcon name={'search'} color={COLORS.white} size={24} />
          </RN.TouchableOpacity>
        }
      />
      <Spacing height={12} />
      <MovieList data={allMovies || []} loading={isLoading} />
    </Container>
  );
}
