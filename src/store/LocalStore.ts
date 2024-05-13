import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Tokens } from '@/shared/types';

interface LocalStoreState {
  isOnboardingViewed: boolean;
  tokens: Tokens | null;
}

const initialState: LocalStoreState = {
  isOnboardingViewed: false,
  tokens: null,
};

const localStore = createSlice({
  name: 'localStore',
  initialState,
  reducers: {
    onForwardOnboarding: (state) => {
      state.isOnboardingViewed = true;
    },
    onUpdateTokens: (
      state,
      action: PayloadAction<{ tokens: Tokens | null }>,
    ) => {
      state.tokens = action.payload.tokens;
    },
  },
});

const selectLocalStore = (state: RootState) => state.localStore;

export const selectIsOnboardingViewed = createSelector(
  [selectLocalStore],
  (localStore) => localStore.isOnboardingViewed,
);

export const selectTokens = createSelector(
  [selectLocalStore],
  (localStore) => localStore.tokens,
);

export const { onForwardOnboarding, onUpdateTokens } = localStore.actions;
export default localStore;
