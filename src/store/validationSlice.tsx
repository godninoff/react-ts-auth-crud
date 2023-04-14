import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { urlPattern, validName } from "../utils/utils";
import { Validation } from "./types";

const initialState: Validation = {
  name: "",
  contactNameErr: "",
  surname: "",
  contactSurnameErr: "",
  avatar: "",
  contactAvatarErr: "",
  disabled: false,
};

export const validationSlice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    validationContactName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      if (state.name === "") {
        state.disabled = true;
        state.contactNameErr = "Необходимо указать имя";
        return;
      }
      if (!validName.test(state.name)) {
        state.disabled = true;
        state.contactNameErr = "Укажите корректное имя";
        return;
      }
      state.contactNameErr = initialState.contactNameErr;
      state.disabled = initialState.disabled;
    },

    validationContactSurname: (state, action: PayloadAction<string>) => {
      state.surname = action.payload;
      if (!validName.test(state.surname)) {
        state.disabled = true;
        state.contactSurnameErr = "Укажите корректную фамилию";
        return;
      }
      state.contactSurnameErr = initialState.contactSurnameErr;
      state.disabled = initialState.disabled;
    },

    validationContactAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
      if (!urlPattern.test(state.avatar)) {
        state.disabled = true;
        state.contactAvatarErr = "Укажите корректный URL";
        return;
      }
      state.contactAvatarErr = initialState.contactAvatarErr;
      state.disabled = initialState.disabled;
    },

    setDisabledState: (state) => {
      state.disabled = true;
    },

    resetData: (state) => {
      return (state = initialState);
    },
  },
});

export const {
  validationContactName,
  validationContactSurname,
  validationContactAvatar,
  setDisabledState,
  resetData,
} = validationSlice.actions;
export default validationSlice.reducer;
