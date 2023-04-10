import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  disabled: false,
};

export const validationSlice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    validationContactName: (state, action) => {
      console.log(state.name);
      if (state.name.length === 0) {
        state.disabled = !state.disabled;
        return;
      }
    },
  },
});

export const { validationContactName } = validationSlice.actions;
export default validationSlice.reducer;
