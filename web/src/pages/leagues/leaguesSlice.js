import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  leagues: [],
  error: null,
  count: 0,
};

export const leaguesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    fetchLeaguesPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchLeaguesSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.leagues = payload.leagues;
      state.count = payload.count;
    },
    fetchLeaguesFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { fetchLeaguesFail, fetchLeaguesPending, fetchLeaguesSuccess } =
  leaguesSlice.actions;

export default leaguesSlice.reducer;
