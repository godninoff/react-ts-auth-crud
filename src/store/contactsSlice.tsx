import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IContact {
  name: string;
  surname: string;
  userId: number;
  id: number;
}

interface ContactsSliceState {
  contacts: IContact[];
}

const initialState: ContactsSliceState = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload.id
      );
    },
    editContact: (state, action) => {
      state.contacts.map((contact) => {
        if (contact.id === action.payload.id) {
          contact.name = action.payload.name;
          contact.surname = action.payload.surname;
        }
        return contact;
      });
    },
  },
});

export const { addContact, removeContact, editContact } = contactsSlice.actions;
export default contactsSlice.reducer;
