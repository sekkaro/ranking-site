import { createLeague, editLeague, getAllLeagues } from "../../api/leaguesApi";
import { logout } from "../login/loginAction";
import {
  addLeagueFail,
  addLeaguePending,
  addLeagueSuccess,
  editLeagueFail,
  editLeaguePending,
  editLeagueSuccess,
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

export const addLeague = (name, setName, setAlertOpen) => async (dispatch) => {
  try {
    dispatch(addLeaguePending());
    const league = await createLeague(name);
    dispatch(addLeagueSuccess(league));
    setName("");
    setAlertOpen(true);
  } catch (err) {
    console.log(err);
    if (err.message === "Forbidden") {
      dispatch(logout(err.message));
      dispatch(addLeagueFail(""));
    } else {
      dispatch(addLeagueFail(err.message));
      setAlertOpen(true);
    }
  }
};

export const changeLeague =
  (id, name, setName, setIsEdit, setAlertOpen) => async (dispatch) => {
    try {
      dispatch(editLeaguePending());
      const league = await editLeague(id, name);
      dispatch(editLeagueSuccess(league));
      setName("");
      setIsEdit(false);
      setAlertOpen(true);
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(logout(err.message));
        dispatch(editLeagueFail(""));
      } else {
        dispatch(editLeagueFail(err.message));
        setAlertOpen(true);
      }
    }
  };
