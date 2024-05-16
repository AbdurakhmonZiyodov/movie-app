import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { ROOT_STACK } from '@/shared/routes';
import { RootState } from '../store';

interface NavigationStoreState {
  redirectRootUrl: ROOT_STACK | null;
}

const initialState: NavigationStoreState = {
  redirectRootUrl: null,
};

const navigationStore = createSlice({
  name: 'navigationStore',
  initialState,
  reducers: {
    onChangeRedirectRootUrl: (
      state,
      action: PayloadAction<{ url: ROOT_STACK | null }>,
    ) => {
      state.redirectRootUrl = action.payload.url;
    },
  },
});

const selectNavigationStore = (state: RootState) => state.navigationStore;

export const selectRedirectRootUrl = createSelector(
  [selectNavigationStore],
  (navigationStore) => navigationStore.redirectRootUrl,
);

export const { onChangeRedirectRootUrl } = navigationStore.actions;

export default navigationStore;
