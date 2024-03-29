import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import validationReducer from "./validationSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authApi } from "./api/authApi";
import { contactsApi } from "./api/contactsApi";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
  auth: authReducer,
  validation: validationReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, contactsApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
