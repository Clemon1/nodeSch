import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./configURL";
export const customerAPI = createApi({
  reducerPath: "customerAPI",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `http://api.nanohostng.com`,
  //   prepareHeaders(headers) {
  //     return headers;
  //   },
  //   credentials: "include",
  // }),

  baseQuery,
  tagTypes: ["customerSlic"],
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: (id) => `/auth/v1/singleUser/${id}`,
      credentials: "include",
      providesTags: ["customerSlic"],
    }),
    getAllUser: builder.query({
      query: (role) => `/auth/v1/allUser/?role=${role}`,

      providesTags: ["customerSlic"],
    }),
    searchUser: builder.query({
      query: (user) => `/auth/v1/searchUsers?search=${user}`,
      providesTags: ["customerSlic"],
    }),
    addCustomer: builder.mutation({
      query: (body) => ({
        url: `/auth/v1/signUp`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["customerSlic"],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useGetAllUserQuery,
  useSearchUserQuery,
  useAddCustomerMutation,
} = customerAPI;
