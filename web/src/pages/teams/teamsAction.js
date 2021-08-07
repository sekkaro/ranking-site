import { getAllLeaguesFast } from "../../api/leaguesApi";
import {
  createTeam,
  deleteTeam,
  editTeam,
  getAllTeams,
} from "../../api/teamsApi";
import { logout } from "../login/loginAction";
import {
  addTeamFail,
  addTeamPending,
  addTeamSuccess,
  deleteTeamFail,
  deleteTeamPending,
  deleteTeamSuccess,
  editTeamFail,
  editTeamPending,
  editTeamSuccess,
  fetchLeagueNamesFail,
  fetchLeagueNamesPending,
  fetchLeagueNamesSuccess,
  fetchTeamsFail,
  fetchTeamsPending,
  fetchTeamsSuccess,
} from "./teamsSlice";

export const fetchTeams =
  (page = 0, keyword = "") =>
  async (dispatch) => {
    try {
      dispatch(fetchTeamsPending());
      const teams = await getAllTeams(page, keyword);
      dispatch(fetchTeamsSuccess(teams));
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(logout(err.message));
        dispatch(fetchTeamsFail(""));
      } else {
        dispatch(fetchTeamsFail(err.message));
      }
    }
  };

export const addTeam = (team, setTeam, setAlertOpen) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch(addTeamPending());
      const newTeam = await createTeam(team.name, team.league);
      dispatch(addTeamSuccess(newTeam));
      setTeam({
        name: "",
        league: "",
      });
      setAlertOpen(true);
      resolve(newTeam);
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(logout(err.message));
        dispatch(addTeamFail(""));
      } else {
        dispatch(addTeamFail(err.message));
        setAlertOpen(true);
      }
      reject();
    }
  });

export const changeTeam =
  (id, team, setTeam, setIsEdit, setAlertOpen) => async (dispatch) => {
    try {
      dispatch(editTeamPending());
      const editedTeam = await editTeam(id, team.name, team.league);
      dispatch(editTeamSuccess(editedTeam));
      setTeam({
        name: "",
        league: "",
      });
      setIsEdit(false);
      setAlertOpen(true);
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(logout(err.message));
        dispatch(editTeamFail(""));
      } else {
        dispatch(editTeamFail(err.message));
        setAlertOpen(true);
      }
    }
  };

export const removeTeam = (id, setAlertOpen) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch(deleteTeamPending());
      await deleteTeam(id);
      dispatch(deleteTeamSuccess());
      setAlertOpen(true);
      resolve();
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(logout(err.message));
        dispatch(deleteTeamFail(""));
      } else {
        dispatch(deleteTeamFail(err.message));
        setAlertOpen(true);
      }
      reject();
    }
  });

export const fetchLeagueNames = () => async (dispatch) => {
  try {
    dispatch(fetchLeagueNamesPending());
    const teams = await getAllLeaguesFast();
    dispatch(fetchLeagueNamesSuccess(teams));
  } catch (err) {
    console.log(err);
    if (err.message === "Forbidden") {
      dispatch(logout(err.message));
      dispatch(fetchLeagueNamesFail(""));
    } else {
      dispatch(fetchLeagueNamesFail(err.message));
    }
  }
};
