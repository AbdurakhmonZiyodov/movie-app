import { configureStore } from '@reduxjs/toolkit';
import { AuthApi } from './services/features/AuthApi';

export default configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([AuthApi.middleware]),
});
