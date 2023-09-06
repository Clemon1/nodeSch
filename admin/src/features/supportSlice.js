import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./configURL";

export const supportApi = createApi({
  reducerPath: "supportApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `http://api.nanohostng.com`,
  //   prepareHeaders(headers) {
  //     return headers;
  //   },
  //   credentials: 'include',
  // }),
  baseQuery,
  tagTypes: ["support"],
  endpoints: (builder) => ({
    getAllSupport: builder.query({
      query: () => `/support/v1/getSupport`,
      providesTags: ["support"],
    }),
    getSingleSupport: builder.query({
      query: (id) => `/support/v1/getSupport/${id}`,
      providesTags: ["support"],
    }),
    replySupport: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/support/v1/updateSupport/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["support"],
    }),
    closeSupportTicket: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/support/v1/closeSupport/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["support"],
    }),
  }),
});

export const {
  useGetAllSupportQuery,
  useGetSingleSupportQuery,
  useReplySupportMutation,
  useCloseSupportTicketMutation,
} = supportApi;
