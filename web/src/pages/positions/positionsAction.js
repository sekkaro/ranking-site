import {
  createPosition,
  deletePosition,
  editPosition,
  getAllPositions,
} from "../../api/positionsApi";
import { logout } from "../login/loginAction";
import {
  addPositionFail,
  addPositionPending,
  addPositionSuccess,
  deletePositionFail,
  deletePositionPending,
  deletePositionSuccess,
  editPositionFail,
  editPositionPending,
  editPositionSuccess,
  fetchPositionsFail,
  fetchPositionsPending,
  fetchPositionsSuccess,
} from "./positionsSlice";

export const fetchPositions =
  (page = 0, keyword = "") =>
  async (dispatch) => {
    try {
      dispatch(fetchPositionsPending());
      const positions = await getAllPositions(page, keyword);
      dispatch(fetchPositionsSuccess(positions));
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(logout(err.message));
        dispatch(fetchPositionsFail(""));
      } else {
        dispatch(fetchPositionsFail(err.message));
      }
    }
  };

export const addPosition = (name, setName, setAlertOpen) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch(addPositionPending());
      const position = await createPosition(name);
      dispatch(addPositionSuccess(position));
      setName("");
      setAlertOpen(true);
      resolve(position);
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(logout(err.message));
        dispatch(addPositionFail(""));
      } else {
        dispatch(addPositionFail(err.message));
        setAlertOpen(true);
      }
      reject();
    }
  });

export const changePosition =
  (id, name, setName, setIsEdit, setAlertOpen) => async (dispatch) => {
    try {
      dispatch(editPositionPending());
      const position = await editPosition(id, name);
      dispatch(editPositionSuccess(position));
      setName("");
      setIsEdit(false);
      setAlertOpen(true);
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(logout(err.message));
        dispatch(editPositionFail(""));
      } else {
        dispatch(editPositionFail(err.message));
        setAlertOpen(true);
      }
    }
  };

export const removePosition = (id, setAlertOpen) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch(deletePositionPending());
      await deletePosition(id);
      dispatch(deletePositionSuccess());
      setAlertOpen(true);
      resolve();
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(logout(err.message));
        dispatch(deletePositionFail(""));
      } else {
        dispatch(deletePositionFail(err.message));
        setAlertOpen(true);
      }
      reject();
    }
  });
