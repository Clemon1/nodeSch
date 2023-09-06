import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./configURL";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `http://api.nanohostng.com`,
  //   prepareHeaders(headers) {
  //     return headers;
  //   },
  //   credentials: "include",
  // }),
  baseQuery,
  tagTypes: ["subscribe"],
  endpoints: (builder) => ({
    getAllSubscription: builder.query({
      query: () => `/subscribe`,
      providesTags: ["subscribe"],
    }),
    getUserSubscription: builder.query({
      query: (id) => `/subscribe/sub?userId=${id}`,
      providesTags: ["subscribe"],
    }),
    getNoOfUserSubs: builder.query({
      query: () => `/subscribe/getNoSub`,
      providesTags: ["subscribe"],
    }),
    addSubscription: builder.mutation({
      query: (body) => ({
        url: `/subscribe`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["subscribe"],
    }),
  }),
});

export const {
  useGetAllSubscriptionQuery,
  useGetUserSubscriptionQuery,
  useGetNoOfUserSubsQuery,
  useAddSubscriptionMutation,
} = subscriptionApi;
