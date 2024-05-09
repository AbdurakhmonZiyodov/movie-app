import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import Container from '@/components/Container';
import CardHorizantalFilter from '@/components/Filters/CardHorizantalFilter';
import RN from '@/components/RN';
import { MockUserImagePng } from '@/shared/assets/mock/images';
import { SIZES } from '@/shared/constants/dimensions';
import React, { useCallback } from 'react';
import type { CarouselRenderItem } from 'react-native-reanimated-carousel';

const data = [
  {
    id: 1,
    source: MockUserImagePng,
    name: 'Jujutsu Kaisen',
  },
  {
    id: 2,
    source: MockUserImagePng,
    name: 'Solo Spdsa',
  },
  {
    id: 3,
    source: MockUserImagePng,
    name: 'Something',
  },
];

const sizes = {
  width: SIZES.width * 1,
  height: SIZES.width * 1 * 0.8,
};
export default function HomeScreen() {
  const renderItem: CarouselRenderItem<(typeof data)[0]> = useCallback(
    ({ item: card }) => (
      <RN.View>
        <RN.Image
          source={MockUserImagePng}
          style={styles.movieImage}
          contentFit={'contain'}
        />
      </RN.View>
    ),
    [],
  );
  return (
    <Container isScroll={true}>
      <Carousel
        data={data}
        renderItem={renderItem}
        width={SIZES.width}
        height={SIZES.width * 0.8}
      />
      <CardHorizantalFilter />
      <RN.View fd={'row'} g={15} jc={'space-between'}>
        <Card isPremium={true} />
        <Card />
      </RN.View>
      <RN.View fd={'row'} g={15} jc={'space-between'}>
        <Card isPremium={true} />
        <Card />
      </RN.View>
      <RN.View fd={'row'} g={15} jc={'space-between'}>
        <Card isPremium={true} />
        <Card />
      </RN.View>
    </Container>
  );
}

const styles = RN.StyleSheet.create({
  movieImage: {
    ...sizes,
    borderRadius: 11,
    overflow: 'hidden',
    width: sizes.width * 0.9,
  },
});
