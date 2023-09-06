import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { registerApi } from "./features/registerSlice";
import { notificationSlice } from "./features/notificationSlice";
import { ProductApi } from "./features/productSlice";
import { orderApi } from "./features/orderSlice";
import { subscriptionApi } from "./features/subscriptionSlice";
import { supportApi } from "./features/supportSlice";
import { customerAPI } from "./features/customerSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [registerApi.reducerPath]: registerApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [notificationSlice.reducerPath]: notificationSlice.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [supportApi.reducerPath]: supportApi.reducer,
    [customerAPI.reducerPath]: customerAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      registerApi.middleware,
      ProductApi.middleware,
      orderApi.middleware,
      notificationSlice.middleware,
      subscriptionApi.middleware,
      supportApi.middleware,
      customerAPI.middleware,
    ]),

  // devTools: true,
});
setupListeners(store.dispatch);
