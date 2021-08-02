import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isEditLoading: false,
  isDeleteLoading: false,
  player: {},
  error: null,
  editError: null,
  deleteError: null,
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
    editPlayerPending: (state) => {
      state.isEditLoading = true;
      state.editError = null;
    },
    editPlayerSuccess: (state) => {
      state.isEditLoading = false;
    },
    editPlayerFail: (state, { payload }) => {
      state.isEditLoading = false;
      state.editError = payload;
    },
    deletePlayerPending: (state) => {
      state.isDeleteLoading = true;
      state.deleteError = null;
    },
    deletePlayerSuccess: (state) => {
      state.isDeleteLoading = false;
    },
    deletePlayerFail: (state, { payload }) => {
      state.isDeleteLoading = false;
      state.deleteError = payload;
    },
  },
});

export const {
  fetchPlayerFail,
  fetchPlayerPending,
  fetchPlayerSuccess,
  editPlayerFail,
  editPlayerPending,
  editPlayerSuccess,
  deletePlayerFail,
  deletePlayerPending,
  deletePlayerSuccess,
} = playerDetailSlice.actions;

export default playerDetailSlice.reducer;
