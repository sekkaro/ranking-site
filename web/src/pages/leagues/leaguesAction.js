import { getAllLeagues } from "../../api/leaguesApi";
import { logout } from "../login/loginAction";
import {
  fetchLeaguesFail,
  fetchLeaguesPending,
  fetchLeaguesSuccess,
} from "./leaguesSlice";

export const fetchLeagues =
  (page = 0, keyword = "") =>
  async (dispatch) => {
    try {
      dispatch(fetchLeaguesPending());
      const leagues = await getAllLeagues(page, keyword);
      dispatch(fetchLeaguesSuccess(leagues));
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(logout(err.message));
        dispatch(fetchLeaguesFail(""));
      } else {
        dispatch(fetchLeaguesFail(err.message));
      }
    }
  };
