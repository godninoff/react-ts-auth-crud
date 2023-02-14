import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./authSlice";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getContacts: build.query({
      query: (userId: number) => `600/users/${userId}/contacts`,
    }),
    addContact: build.mutation({
      query(data) {
        const { userId, ...body } = data;
        return {
          url: `600/users/${userId}/contacts`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useGetContactsQuery, useAddContactMutation } = contactsApi;
