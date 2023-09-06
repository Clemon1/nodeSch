import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseUrl = `http://api.nanohostng.com`;
export const baseUrl = `http://localhost:4000`;
export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders(headers) {
    return headers;
  },
  credentials: "include",
});
