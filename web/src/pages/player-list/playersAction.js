import { getAllPlayers } from "../../api/playersApi";
import { loginFail } from "../admin/authSlice";
import {
  fetchPlayersFail,
  fetchPlayersPending,
  fetchPlayersSuccess,
} from "./playersSlice";

export const fetchPlayers =
  (history, page = 0, keyword = "") =>
  async (dispatch) => {
    try {
      dispatch(fetchPlayersPending());
      const players = await getAllPlayers(page, keyword);
      dispatch(fetchPlayersSuccess(players));
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(loginFail(err.message));
        localStorage.removeItem("token");
        history.push("/login");
      }
      dispatch(fetchPlayersFail(err.message));
    }
  };
