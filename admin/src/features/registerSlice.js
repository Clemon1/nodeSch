import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./configURL";

export const registerApi = createApi({
  reducerPath: "registerApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `http://api.nanohostng.com`,
  //   prepareHeaders(headers) {
  //     return headers;
  //   },
  //   credentials: "include",
  // }),
  baseQuery: baseQuery,
  tagTypes: ["authSystem"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/admin/v1/admin/user`,
      credentials: "include",
      providesTags: ["authSystem"],
    }),

    addRegister: builder.mutation({
      query: (body) => ({
        url: `/admin/v1/admin/signUp`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["authSystem"],
    }),
    addLogin: builder.mutation({
      query: (body) => ({
        url: `/admin/v1/admin/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["authSystem"],
    }),
  }),
});

export const { useAddRegisterMutation, useAddLoginMutation, useGetUserQuery } =
  registerApi;
