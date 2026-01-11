import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@entities/auth/auth.slice"
import { repositoriesApi } from "@entities/repository";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [repositoriesApi.reducerPath]: repositoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(repositoriesApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
