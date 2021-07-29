import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  players: [],
  error: null,
  count: 0,
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    fetchPlayersPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPlayersSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.players = payload.players;
      state.count = payload.count;
    },
    fetchPlayersFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { fetchPlayersFail, fetchPlayersPending, fetchPlayersSuccess } =
  playersSlice.actions;

export default playersSlice.reducer;
