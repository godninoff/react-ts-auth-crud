import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "./store";

export interface Auth {
  userId: number | null;
  token: string | null;
}

const initialState: Auth = {
  userId: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (
      state,
      action: PayloadAction<{ userId: number; token: string }>
    ) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    signOut(state) {
      state.userId = null;
      state.token = null;
    },
  },
});

export const { getUser, signOut } = authSlice.actions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.auth.userId;
export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
