import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isAddLoading: false,
  isEditLoading: false,
  isDeleteLoading: false,
  positions: [],
  error: null,
  addError: null,
  editError: null,
  deleteError: null,
  count: 0,
};

export const positionsSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {
    fetchPositionsPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPositionsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.positions = payload.positions;
      state.count = payload.count;
    },
    fetchPositionsFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    addPositionPending: (state) => {
      state.isAddLoading = true;
      state.addError = null;
    },
    addPositionSuccess: (state, { payload }) => {
      state.isAddLoading = false;
      // state.leagues = [payload, ...state.leagues.slice(0, -1)];
      // state.count += 1;
    },
    addPositionFail: (state, { payload }) => {
      state.isAddLoading = false;
      state.addError = payload;
    },
    editPositionPending: (state) => {
      state.isEditLoading = true;
      state.editError = null;
    },
    editPositionSuccess: (state, { payload }) => {
      state.isEditLoading = false;
      const idx = state.positions.findIndex(
        (league) => league._id === payload._id
      );
      state.positions[idx] = payload;
    },
    editPositionFail: (state, { payload }) => {
      state.isEditLoading = false;
      state.editError = payload;
    },
    deletePositionPending: (state) => {
      state.isDeleteLoading = true;
      state.deleteError = null;
    },
    deletePositionSuccess: (state) => {
      state.isDeleteLoading = false;
    },
    deletePositionFail: (state, { payload }) => {
      state.isDeleteLoading = false;
      state.deleteError = payload;
    },
  },
});

export const {
  fetchPositionsFail,
  fetchPositionsPending,
  fetchPositionsSuccess,
  addPositionFail,
  addPositionPending,
  addPositionSuccess,
  editPositionFail,
  editPositionPending,
  editPositionSuccess,
  deletePositionFail,
  deletePositionPending,
  deletePositionSuccess,
} = positionsSlice.actions;

export default positionsSlice.reducer;
