import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("userInfo");

const initialState = {
  isLoading: false,
  User: user ? JSON.parse(user) : null,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Pending: (state) => {
      state.isLoading = true;
    },
    Success: (state, action) => {
      state.isLoading = false;
      state.User = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      localStorage.setItem("timeInfo", Date.now());
    },
    Error: (state, action) => {
      state.error = action.payload;
    },

    logOut: (state) => {
      state.isLoading = false;
      state.User = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("timeInfo");
    },
  },
});

// Action creators are generated for each case reducer function
export const { Pending, Success, Error, logOut } = authSlice.actions;

export const currentUser = (state) => state.auth.User;

export default authSlice.reducer;
