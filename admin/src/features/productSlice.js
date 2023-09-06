import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./configURL";

export const ProductApi = createApi({
  reducerPath: "ProductApi",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: `http://api.nanohostng.com`,
  //   prepareHeaders(headers) {
  //     return headers;
  //   },
  //   credentials: 'include',
  // }),
  baseQuery,
  tagTypes: ["Product"],
  endpoints: (build) => ({
    getProduct: build.query({
      query: () => `/product`,
      providesTags: ["Product"],
      credentials: "include",
    }),
    getSingleProduct: build.query({
      query: ({ id }) => `/product/${id}`,
      providesTags: ["Product"],
      credentials: "include",
    }),
    addProduct: build.mutation({
      query: (body) => ({
        url: `/product`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: build.mutation({
      query({ id, ...body }) {
        return {
          url: `/product/${id}`,
          method: "PATCH",
          body,
        };
      },

      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} = ProductApi;

// export const fetchProducts = () => {
//   return useGetProductQuery();
// };
