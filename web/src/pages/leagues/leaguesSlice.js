import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isAddLoading: false,
  leagues: [],
  error: null,
  addError: null,
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
    addLeaguePending: (state) => {
      state.isAddLoading = true;
      state.addError = null;
    },
    addLeagueSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.leagues = [payload, ...state.leagues.slice(0, -1)];
      state.count += 1;
    },
    addLeagueFail: (state, { payload }) => {
      state.isAddLoading = false;
      state.addError = payload;
    },
  },
});

export const {
  fetchLeaguesFail,
  fetchLeaguesPending,
  fetchLeaguesSuccess,
  addLeagueFail,
  addLeaguePending,
  addLeagueSuccess,
} = leaguesSlice.actions;

export default leaguesSlice.reducer;
