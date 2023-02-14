import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./authApi";
import contactReducer from "./contactsSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    contacts: contactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);
