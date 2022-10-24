import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./authApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
