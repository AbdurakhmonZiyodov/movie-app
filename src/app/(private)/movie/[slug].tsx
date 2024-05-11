import Container from '@/components/Container';
import RN from '@/components/RN';
import { COLORS } from '@/shared/constants/colors';
import { useOneMovieQuery } from '@/store/services/features/MovieApi';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

const MovieScreen = () => {
  const { slug } = useLocalSearchParams();
  const { data } = useOneMovieQuery({ id: slug as string });

  console.log({ data });
  return (
    <Container>
      <RN.Text style={styles.title}>{'Full Video Screen'}</RN.Text>
    </Container>
  );
};

const styles = RN.StyleSheet.create({
  title: {
    fontSize: 16,
    color: COLORS.white,
  },
});

export default MovieScreen;
