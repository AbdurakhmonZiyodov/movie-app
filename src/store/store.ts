import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import localStore from './LocalStore';
import { AuthApi } from './services/features/AuthApi';
import { MovieApi } from './services/features/MovieApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [MovieApi.reducerPath]: MovieApi.reducer,
  localStore: localStore.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['localStore'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      AuthApi.middleware,
      MovieApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
