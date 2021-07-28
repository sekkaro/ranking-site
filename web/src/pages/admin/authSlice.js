import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {},
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuth = true;
      state.error = null;
    },
    loginFail: (state, { payload }) => {
      state.isAuth = false;
      state.error = payload;
    },
    getUserSuccess: (state, { payload }) => {
      state.isAuth = true;
      state.error = null;
      state.user = payload;
    },
  },
});

export const { loginSuccess, loginFail, getUserSuccess } = authSlice.actions;

export default authSlice.reducer;
