import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface LocalStoreState {
  authVisiblity: boolean;
  isOnboardingViewed: boolean;
}

const initialState: LocalStoreState = {
  authVisiblity: false,
  isOnboardingViewed: false,
};

const localStore = createSlice({
  name: 'localStore',
  initialState,
  reducers: {
    onChangeAuthVisiblity: (
      state,
      action: PayloadAction<{ visiblity: boolean }>,
    ) => {
      state.authVisiblity = action.payload.visiblity;
    },
    onForwardOnboarding: (state) => {
      state.isOnboardingViewed = true;
    },
  },
});

const selectLocalStore = (state: RootState) => state.localStore;
export const selectAuthVisibility = createSelector(
  [selectLocalStore],
  (localStore) => localStore.authVisiblity,
);
export const selectIsOnboardingViewed = createSelector(
  [selectLocalStore],
  (localStore) => localStore.isOnboardingViewed,
);

export const { onChangeAuthVisiblity, onForwardOnboarding } =
  localStore.actions;
export default localStore;
