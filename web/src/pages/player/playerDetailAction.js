import { getPlayerDetail } from "../../api/playersApi";
import { loginFail } from "../admin/authSlice";
import {
  fetchPlayerFail,
  fetchPlayerPending,
  fetchPlayerSuccess,
} from "./playerDetailSlice";

export const fetchPlayerDetail = (history, id) => async (dispatch) => {
  try {
    dispatch(fetchPlayerPending());
    const player = await getPlayerDetail(id);
    dispatch(fetchPlayerSuccess(player));
  } catch (err) {
    console.log(err);
    if (err.message === "Forbidden") {
      dispatch(loginFail(err.message));
      // localStorage.removeItem("token");
      // history.push("/login");
    }
    dispatch(fetchPlayerFail(err.message));
  }
};
