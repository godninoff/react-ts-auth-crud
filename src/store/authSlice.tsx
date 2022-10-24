import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from ".";

export interface Auth {
  user: string | null;
  token: string | null;
}

const initialState: Auth = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUser: (
      state,
      action: PayloadAction<{ user: string; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signOut(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { getUser, signOut } = authSlice.actions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
