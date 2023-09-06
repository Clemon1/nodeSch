import { createApi } from "@reduxjs/toolkit/query/react";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { baseQuery } from "./configURL";

const notificationAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const initialState = notificationAdapter.getInitialState();

export const notificationSlice = createApi({
  reducerPath: "notificationSlice",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://api.nanohostng.com" }),
  baseQuery,
  tagTypes: ["Notification"],
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: (user) => `/notification?userId=${user}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (resData) => {
        const loadedNots = resData.map((data) => {
          data.id = data._id;
          return data;
        });
        return notificationAdapter.setAll(initialState, loadedNots);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Notification", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Notification", id })),
          ];
        } else return [{ type: "Notification", id: "LIST" }];
      },
    }),
    getSingleNotification: builder.query({
      query: (id) => `/notification/${id}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (resData) => {
        // console.log(resData);
        const loadedNots = resData.map((data) => {
          data.id = data._id;
          return data;
        });
        return notificationAdapter.setAll(initialState, loadedNots);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Notification", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Notification", id })),
          ];
        } else return [{ type: "Notification", id: "LIST" }];
      },
    }),
    updateNotification: builder.mutation({
      query: (update) => ({
        url: `/notification/${update.id}`,
        method: "PATCH",
        body: update,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Notification", id: arg.id },
      ],
    }),
    archiveNotification: builder.mutation({
      query: (id) => ({
        url: `/notification/archive`,
        method: "POST",
        body: {
          id,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Notification", id: arg.id },
      ],
    }),
  }),
});
export const {
  useGetNotificationQuery,
  useGetSingleNotificationQuery,
  useUpdateNotificationMutation,
  useArchiveNotificationMutation,
} = notificationSlice;

export const selectNotificationResult =
  notificationSlice.endpoints.getNotification.select();

const selectNotificationData = createSelector(
  selectNotificationResult,
  (notificationResult) => notificationResult.data,
);

export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
  selectIds: selectNotificationIds,
} = notificationAdapter.getSelectors(
  (state) => selectNotificationData(state) ?? initialState,
);
