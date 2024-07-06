import BottomSheet, { BottomSheetRef } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import Container from '@/components/Container';
import MovieList from '@/components/MovieList';
import RN from '@/components/RN';
import { Spacing } from '@/components/Spacing';
import { PoppinsFonts } from '@/shared/assets/fonts/poppins.fonts';
import SliderIcon from '@/shared/assets/icons/SliderIcon';
import { COLORS } from '@/shared/constants/colors';
import { normalizeHeight } from '@/shared/constants/dimensions';
import { DEBUG } from '@/shared/constants/global';
import useVisibility from '@/shared/hooks/useVisibility';
import {
  useAllMoviesQuery,
  useMovieCountryListQuery,
  useMovieGanreListQuery,
  useMovieYearListQuery,
} from '@/store/services/features/MovieApi';
import { Portal } from '@gorhom/portal';
import { isEqual, keys, map } from 'lodash';
import React, {
  ReactNode,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const config: any = {
  holderColor: 'white',
  fromZero: true,
  backgroundColor: 'dark',
};

type FilterState = {
  movie_genre_id: string | null;
  year_id: string | null;
  quality: string | null;
  country_id: string | null;
};

const initialFilterState: FilterState = {
  movie_genre_id: null,
  year_id: null,
  quality: null,
  country_id: null,
};

export default function CategoryScreen() {
  const [filterState, updateFilterState] =
    useState<FilterState>(initialFilterState);

  const filterParams = useMemo(() => {
    const params: FilterState = { ...initialFilterState };

    keys(filterState).forEach((keyName: string) => {
      const key = keyName as keyof FilterState;
      if (filterState[key]) {
        params[key] = filterState[key];
      } else {
        delete params[key];
      }
    });

    return params;
  }, [filterState]);

  const {
    data: allMovies,
    isLoading,
    isFetching,
    refetch,
  } = useAllMoviesQuery({
    params: filterParams,
  });
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const refreshControlVisible = useVisibility();

  const onShowModal = useCallback(() => {
    bottomSheetRef.current?.onShow();
  }, []);

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
      <Button
        title={'FILTER'}
        style={styles.button}
        onPress={onShowModal}
        RightSection={<SliderIcon color={COLORS.white} size={24} />}
      />
      <Spacing height={18} />
      <RN.ScrollView
        showsVerticalScrollIndicator={false}
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
      <CategoryBottomSheet
        filterState={filterState}
        updateFilterState={updateFilterState}
        bottomSheetRef={bottomSheetRef}
      />
    </Container>
  );
}

export const CategoryBottomSheet = ({
  bottomSheetRef,
  filterState,
  updateFilterState,
}: {
  bottomSheetRef?: RefObject<BottomSheetRef>;
  filterState: FilterState;
  updateFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}) => {
  const { data: allMovieGanreData } = useMovieGanreListQuery();
  const { data: allMovieYearData } = useMovieYearListQuery();
  const { data: allMovieCountryData } = useMovieCountryListQuery();

  const onUpdateFilter = useCallback(
    (key: keyof FilterState, value: any) => {
      updateFilterState((prevState) => ({
        ...prevState,
        [key]: isEqual(prevState[key], value) ? null : value,
      }));
    },
    [updateFilterState],
  );

  const onCancelFilter = useCallback(() => {
    updateFilterState({} as typeof filterState);
    bottomSheetRef?.current?.onHide();
  }, [bottomSheetRef, updateFilterState]);

  const renderChild = useCallback(
    (child: ReactNode) => (
      <RN.View style={styles.wrapper}>
        {child}
        <RN.Text style={styles.title}>{'Filter'}</RN.Text>

        <ScrollView contentContainerStyle={{ paddingVertical: 15 }}>
          {/* Ganer list */}
          <RN.Text style={styles.filterTitle}>{'Janrlar:'}</RN.Text>
          <RN.View fd={'row'} g={5} style={{ flexWrap: 'wrap' }}>
            {map(allMovieGanreData ?? [], (ganre) => {
              const isActive = isEqual(filterState?.movie_genre_id, ganre.id);
              return (
                <RN.TouchableOpacity
                  onPress={() => onUpdateFilter('movie_genre_id', ganre.id)}
                  style={[
                    styles.filterButton,
                    isActive && styles.activeFilterButton,
                  ]}
                  key={ganre.id}
                >
                  <RN.Text
                    style={[
                      styles.filterButtonText,
                      isActive && styles.activeFilterButtonText,
                    ]}
                  >
                    {ganre.name}
                  </RN.Text>
                </RN.TouchableOpacity>
              );
            })}
          </RN.View>

          {/* year list */}
          <Spacing steps={2} />
          <RN.Text style={styles.filterTitle}>{'Yillar:'}</RN.Text>
          <RN.View fd={'row'} g={5} style={{ flexWrap: 'wrap' }}>
            {map(allMovieYearData ?? [], (item) => {
              const isActive = isEqual(filterState?.year_id, item.id);
              return (
                <RN.TouchableOpacity
                  onPress={() => onUpdateFilter('year_id', item.id)}
                  style={[
                    styles.filterButton,
                    isActive && styles.activeFilterButton,
                  ]}
                  key={item.id}
                >
                  <RN.Text
                    style={[
                      styles.filterButtonText,
                      isActive && styles.activeFilterButtonText,
                    ]}
                  >
                    {item.year}
                  </RN.Text>
                </RN.TouchableOpacity>
              );
            })}
          </RN.View>

          {/* quality list */}
          {/* <Spacing steps={2} />
          <RN.Text style={styles.filterTitle}>{'Sifatlar:'}</RN.Text>
          <RN.View fd={'row'} g={5} style={{ flexWrap: 'wrap' }}>
            {map(MovieQuality ?? [], (key) => {
              const isActive = isEqual(key, filterState?.quality);
              return (
                <RN.TouchableOpacity
                  onPress={() => onUpdateFilter('quality', key)}
                  style={[
                    styles.filterButton,
                    isActive && styles.activeFilterButton,
                  ]}
                  key={key}
                >
                  <RN.Text
                    style={[
                      styles.filterButtonText,
                      isActive && styles.activeFilterButtonText,
                    ]}
                  >
                    {MOVIE_FORMAT[key]}
                  </RN.Text>
                </RN.TouchableOpacity>
              );
            })}
          </RN.View> */}

          {/* country list */}
          <Spacing steps={2} />
          <RN.Text style={styles.filterTitle}>{'Davlatlar:'}</RN.Text>
          <RN.View fd={'row'} g={5} style={{ flexWrap: 'wrap' }}>
            {map(allMovieCountryData ?? [], (item) => {
              const isActive = isEqual(item.id, filterState?.country_id);
              return (
                <RN.TouchableOpacity
                  onPress={() => onUpdateFilter('country_id', item.id)}
                  style={[
                    styles.filterButton,
                    isActive && styles.activeFilterButton,
                  ]}
                  key={item.id}
                >
                  <RN.Text
                    style={[
                      styles.filterButtonText,
                      isActive && styles.activeFilterButtonText,
                    ]}
                  >
                    {item.name}
                  </RN.Text>
                </RN.TouchableOpacity>
              );
            })}
          </RN.View>
        </ScrollView>
        <RN.View fd={'row'} jc={'space-between'}>
          <Button
            title={'Oynani yopish'}
            onPress={() => {
              bottomSheetRef?.current?.onHide();
            }}
            style={{ width: '48.5%' }}
          />
          <Button
            title={'Filter bekor qilish'}
            onPress={onCancelFilter}
            style={{ width: '48.5%', backgroundColor: 'blue' }}
          />
        </RN.View>
      </RN.View>
    ),
    [
      allMovieCountryData,
      allMovieGanreData,
      allMovieYearData,
      filterState,
      onCancelFilter,
      onUpdateFilter,
      bottomSheetRef,
    ],
  );

  return (
    <Portal>
      <BottomSheet {...config} maxYPosition={0} bottomSheetRef={bottomSheetRef}>
        {renderChild}
      </BottomSheet>
    </Portal>
  );
};

const styles = RN.StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.dark,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  title: {
    fontSize: normalizeHeight(28),
    fontFamily: PoppinsFonts.Poppins_600,
    textAlign: 'center',
    paddingTop: 10,
    color: COLORS.white,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterTitle: {
    fontSize: normalizeHeight(16),
    fontFamily: PoppinsFonts.Poppins_600,
    color: COLORS.white,
  },
  filterButtonText: {
    fontSize: normalizeHeight(16),
    fontFamily: PoppinsFonts.Poppins_300,
    color: COLORS.black3,
  },
  activeFilterButtonText: {
    color: COLORS.white,
  },
  filterButton: {
    padding: 10,
    borderRadius: 10,
    gap: 2,
    backgroundColor: COLORS.black2,
    height: 40,
  },
  activeFilterButton: {
    backgroundColor: COLORS.orange,
  },
});
