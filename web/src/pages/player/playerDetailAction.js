import { editPlayerDetail, getPlayerDetail } from "../../api/playersApi";
import { loginFail } from "../admin/authSlice";
import {
  editPlayerFail,
  editPlayerPending,
  editPlayerSuccess,
  fetchPlayerFail,
  fetchPlayerPending,
  fetchPlayerSuccess,
} from "./playerDetailSlice";

export const fetchPlayerDetail = (id) => async (dispatch) => {
  try {
    dispatch(fetchPlayerPending());
    const player = await getPlayerDetail(id);
    dispatch(fetchPlayerSuccess(player));
  } catch (err) {
    console.log(err);
    if (err.message === "Forbidden") {
      dispatch(loginFail(err.message));
    }
    dispatch(fetchPlayerFail(err.message));
  }
};

export const editPlayer = (player) => async (dispatch) => {
  try {
    dispatch(editPlayerPending());
    await editPlayerDetail(player);
    dispatch(editPlayerSuccess());
  } catch (err) {
    console.log(err);
    if (err.message === "Forbidden") {
      dispatch(loginFail(err.message));
    }
    dispatch(editPlayerFail(err.message));
  }
};
