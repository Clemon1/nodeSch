import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./configURL";
export const orderApi = createApi({
  reducerPath: "orderApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `http://api.nanohostng.com`,
  //   prepareHeaders(headers) {
  //     return headers;
  //   },
  //   credentials: "include",
  // }),
  baseQuery,

  tagTypes: ["order"],
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => `/hardwareRequest/v1/viewAll`,
      providesTags: ["order"],
    }),
    getSingleOrder: build.query({
      query: ({ id }) => `/hardwareRequest/v1/viewAll/${id}`,
      providesTags: ["order"],
      credentials: "include",
    }),
    addOrder: build.mutation({
      query: (body) => ({
        url: `/hardwareRequest/v1/createRequest`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["order"],
    }),
    updateOrder: build.mutation({
      query({ id, ...body }) {
        return {
          url: `/hardwareRequest/v1/updateRequest/${id}`,
          method: "PATCH",
          body,
        };
      },

      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetSingleOrderQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
} = orderApi;
