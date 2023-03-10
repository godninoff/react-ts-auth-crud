import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authentication", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    auth: build.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "login",
          method: "POST",
          body,
        };
      },
    }),
    register: build.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "register",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useAuthMutation, useRegisterMutation } = authApi;
