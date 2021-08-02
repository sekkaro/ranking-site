import {
  deletePlayer,
  editPlayerDetail,
  getPlayerDetail,
} from "../../api/playersApi";
import { logout } from "../login/loginAction";
import {
  deletePlayerFail,
  deletePlayerPending,
  deletePlayerSuccess,
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
      dispatch(logout(err.message));
      dispatch(fetchPlayerFail(""));
    } else {
      dispatch(fetchPlayerFail(err.message));
    }
  }
};

export const editPlayer = (player, setOpen) => async (dispatch) => {
  try {
    dispatch(editPlayerPending());
    await editPlayerDetail(player);
    dispatch(editPlayerSuccess());
    setOpen(true);
  } catch (err) {
    console.log(err);
    if (err.message === "Forbidden") {
      dispatch(logout(err.message));
      dispatch(editPlayerFail(""));
    } else {
      dispatch(editPlayerFail(err.message));
    }
  }
};

export const deletePlayerDetail = (id, history) => async (dispatch) => {
  try {
    dispatch(deletePlayerPending());
    await deletePlayer(id);
    dispatch(deletePlayerSuccess());
    history.replace("/players");
  } catch (err) {
    console.log(err);
    if (err.message === "Forbidden") {
      dispatch(logout(err.message));
      dispatch(deletePlayerFail(""));
    } else {
      dispatch(deletePlayerFail(err.message));
    }
  }
};
