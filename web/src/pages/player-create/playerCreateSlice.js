import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isPositionsLoading: false,
  isTeamsLoading: false,
  positions: [],
  teams: [],
  error: null,
  positionsError: null,
  teamsError: null,
};

export const createPlayerSlice = createSlice({
  name: "playerCreate",
  initialState,
  reducers: {
    createPlayerPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createPlayerSuccess: (state) => {
      state.isLoading = false;
    },
    createPlayerFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    fetchPositionNamesPending: (state) => {
      state.isPositionsLoading = true;
      state.positionsError = null;
    },
    fetchPositionNamesSuccess: (state, { payload }) => {
      state.isPositionsLoading = false;
      state.positions = payload.positions;
    },
    fetchPositionNamesFail: (state, { payload }) => {
      state.isPositionsLoading = false;
      state.positionsError = payload;
    },
    fetchTeamNamesPending: (state) => {
      state.isTeamsLoading = true;
      state.teamsError = null;
    },
    fetchTeamNamesSuccess: (state, { payload }) => {
      state.isTeamsLoading = false;
      state.teams = payload.teams;
    },
    fetchTeamNamesFail: (state, { payload }) => {
      state.isTeamsLoading = false;
      state.teamsError = payload;
    },
  },
});

export const {
  createPlayerFail,
  createPlayerPending,
  createPlayerSuccess,
  fetchPositionNamesFail,
  fetchPositionNamesPending,
  fetchPositionNamesSuccess,
  fetchTeamNamesFail,
  fetchTeamNamesPending,
  fetchTeamNamesSuccess,
} = createPlayerSlice.actions;

export default createPlayerSlice.reducer;
