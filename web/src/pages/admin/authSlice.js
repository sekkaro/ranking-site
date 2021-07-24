import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
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
  },
});

export const { loginSuccess, loginFail } = authSlice.actions;

export default authSlice.reducer;
