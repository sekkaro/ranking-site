import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isAddLoading: false,
  isEditLoading: false,
  isDeleteLoading: false,
  teams: [],
  error: null,
  addError: null,
  editError: null,
  deleteError: null,
  count: 0,
};

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    fetchTeamsPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchTeamsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.teams = payload.teams;
      state.count = payload.count;
    },
    fetchTeamsFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    addTeamPending: (state) => {
      state.isAddLoading = true;
      state.addError = null;
    },
    addTeamSuccess: (state, { payload }) => {
      state.isAddLoading = false;
      // state.leagues = [payload, ...state.leagues.slice(0, -1)];
      // state.count += 1;
    },
    addTeamFail: (state, { payload }) => {
      state.isAddLoading = false;
      state.addError = payload;
    },
    editTeamPending: (state) => {
      state.isEditLoading = true;
      state.editError = null;
    },
    editTeamSuccess: (state, { payload }) => {
      state.isEditLoading = false;
      const idx = state.teams.findIndex((team) => team._id === payload._id);
      state.teams[idx] = payload;
    },
    editTeamFail: (state, { payload }) => {
      state.isEditLoading = false;
      state.editError = payload;
    },
    deleteTeamPending: (state) => {
      state.isDeleteLoading = true;
      state.deleteError = null;
    },
    deleteTeamSuccess: (state) => {
      state.isDeleteLoading = false;
    },
    deleteTeamFail: (state, { payload }) => {
      state.isDeleteLoading = false;
      state.deleteError = payload;
    },
  },
});

export const {
  fetchTeamsFail,
  fetchTeamsPending,
  fetchTeamsSuccess,
  addTeamFail,
  addTeamPending,
  addTeamSuccess,
  editTeamFail,
  editTeamPending,
  editTeamSuccess,
  deleteTeamFail,
  deleteTeamPending,
  deleteTeamSuccess,
} = teamsSlice.actions;

export default teamsSlice.reducer;
