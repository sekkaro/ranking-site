import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isAddLoading: false,
  isEditLoading: false,
  isDeleteLoading: false,
  leagues: [],
  error: null,
  addError: null,
  editError: null,
  deleteError: null,
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
      state.isAddLoading = false;
      // state.leagues = [payload, ...state.leagues.slice(0, -1)];
      // state.count += 1;
    },
    addLeagueFail: (state, { payload }) => {
      state.isAddLoading = false;
      state.addError = payload;
    },
    editLeaguePending: (state) => {
      state.isEditLoading = true;
      state.editError = null;
    },
    editLeagueSuccess: (state, { payload }) => {
      state.isEditLoading = false;
      const idx = state.leagues.findIndex(
        (league) => league._id === payload._id
      );
      state.leagues[idx] = payload;
    },
    editLeagueFail: (state, { payload }) => {
      state.isEditLoading = false;
      state.editError = payload;
    },
    deleteLeaguePending: (state) => {
      state.isDeleteLoading = true;
      state.deleteError = null;
    },
    deleteLeagueSuccess: (state) => {
      state.isDeleteLoading = false;
    },
    deleteLeagueFail: (state, { payload }) => {
      state.isDeleteLoading = false;
      state.deleteError = payload;
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
  editLeagueFail,
  editLeaguePending,
  editLeagueSuccess,
  deleteLeagueFail,
  deleteLeaguePending,
  deleteLeagueSuccess,
} = leaguesSlice.actions;

export default leaguesSlice.reducer;
