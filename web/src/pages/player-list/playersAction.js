import { getAllPlayers } from "../../api/playersApi";
import { logout } from "../login/loginAction";
import {
  fetchPlayersFail,
  fetchPlayersPending,
  fetchPlayersSuccess,
} from "./playersSlice";

export const fetchPlayers =
  (
    page = 0,
    name = "",
    number = ""
    // sort = "", type = ""
  ) =>
  async (dispatch) => {
    try {
      dispatch(fetchPlayersPending());
      // const players = await getAllPlayers(page, keyword, sort, type);
      const players = await getAllPlayers(page, name, number);
      dispatch(fetchPlayersSuccess(players));
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(logout(err.message));
        dispatch(fetchPlayersFail(""));
      } else {
        dispatch(fetchPlayersFail(err.message));
      }
    }
  };
