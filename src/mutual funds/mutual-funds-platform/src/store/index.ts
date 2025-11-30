import { configureStore } from '@reduxjs/toolkit';

// Minimal placeholder reducers - expand when implementing features
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
