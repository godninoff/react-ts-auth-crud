import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IContact } from "../types";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/",
  }),
  tagTypes: ["Contacts"],
  endpoints: (build) => ({
    getContacts: build.query<IContact[], void>({
      query: () => `contacts`,
      providesTags: ["Contacts"],
    }),
    addContact: build.mutation<void, IContact>({
      query(data) {
        return {
          url: `contacts`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Contacts"],
    }),
    removeContact: build.mutation<void, IContact>({
      query: ({ id }) => ({
        url: `contacts/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Contacts"],
    }),
    editContact: build.mutation<void, IContact>({
      query(data) {
        return {
          url: `contacts/${data.id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useRemoveContactMutation,
  useEditContactMutation,
} = contactsApi;
