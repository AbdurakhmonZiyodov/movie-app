import Container from '@/components/Container';
import { FormInput } from '@/components/FormController/FormController';
import MovieList from '@/components/MovieList';
import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import { COLORS } from '@/shared/constants/colors';
import { DEBUG } from '@/shared/constants/global';
import useVisibility from '@/shared/hooks/useVisibility';
import { HIT_SLOP } from '@/shared/styles/globalStyles';
import { useAllMoviesQuery } from '@/store/services/features/MovieApi';
import { FontAwesome as FontAwesomeIcon } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { RefreshControl } from 'react-native';

export default function SearchScreen() {
  const refreshControlVisible = useVisibility();
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

  const onRefresh = useCallback(async () => {
    try {
      refreshControlVisible.show();
      await refetch().then(() => {
        setTimeout(refreshControlVisible.hide, 400);
      });
    } catch (err) {
      if (DEBUG) console.error(err);
    }
  }, [refetch, refreshControlVisible]);

  return (
    <Container>
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
      <RN.ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshControlVisible.visible}
            onRefresh={onRefresh}
            tintColor={COLORS.white}
            colors={[COLORS.black, COLORS.orange, COLORS.black]}
          />
        }
      >
        <MovieList
          data={allMovies || []}
          loading={
            refreshControlVisible.visible ? false : isLoading || isFetching
          }
        />
        <Spacing steps={8} />
      </RN.ScrollView>
    </Container>
  );
}
