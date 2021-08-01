import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  player: {},
  error: null,
};

export const playerDetailSlice = createSlice({
  name: "playerDetail",
  initialState,
  reducers: {
    fetchPlayerPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPlayerSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.player = payload;
    },
    fetchPlayerFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { fetchPlayerFail, fetchPlayerPending, fetchPlayerSuccess } =
  playerDetailSlice.actions;

export default playerDetailSlice.reducer;
