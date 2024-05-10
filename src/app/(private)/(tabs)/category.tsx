import { Button } from '@/components/Button';
import Container from '@/components/Container';
import MovieList from '@/components/MovieList';
import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import SliderIcon from '@/shared/assets/icons/SliderIcon';
import { COLORS } from '@/shared/constants/colors';
import { useAllMoviesQuery } from '@/store/services/features/MovieApi';
import React from 'react';

export default function CategoryScreen() {
  const { data: allMovies, isLoading } = useAllMoviesQuery();
  return (
    <Container>
      <Button
        title={'FILTER'}
        style={styles.button}
        RightSection={<SliderIcon color={COLORS.white} size={24} />}
      />
      <Spacing height={18} />
      <MovieList data={allMovies || []} loading={isLoading} />
    </Container>
  );
}

const styles = RN.StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
