import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Tokens } from '@/shared/types';

interface LocalStoreState {
  isOnboardingViewed: boolean;
  tokens: Tokens | null;
  isNewUser: boolean;
}

const initialState: LocalStoreState = {
  isOnboardingViewed: false,
  tokens: null,
  isNewUser: true,
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
    onUpdateNewUser: (state, action: PayloadAction<boolean>) => {
      state.isNewUser = action.payload;
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

export const selectIsNewUser = createSelector(
  [selectLocalStore],
  (localStore) => localStore.isNewUser,
);

export const { onForwardOnboarding, onUpdateTokens, onUpdateNewUser } =
  localStore.actions;
export default localStore;
