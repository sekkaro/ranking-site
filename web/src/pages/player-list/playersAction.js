import { getAllPlayers } from "../../api/playersApi";
import { loginFail } from "../admin/authSlice";
import {
  fetchPlayersFail,
  fetchPlayersPending,
  fetchPlayersSuccess,
} from "./playersSlice";

export const fetchPlayers =
  (page = 0) =>
  async (dispatch) => {
    try {
      dispatch(fetchPlayersPending());
      const players = await getAllPlayers(page);
      dispatch(fetchPlayersSuccess(players));
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(loginFail(err.message));
        localStorage.removeItem("token");
      }
      dispatch(fetchPlayersFail(err.message));
    }
  };
