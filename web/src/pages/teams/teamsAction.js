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

export const addTeam = (name, setName, setAlertOpen) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch(addTeamPending());
      const team = await createTeam(name);
      dispatch(addTeamSuccess(team));
      setName("");
      setAlertOpen(true);
      resolve(team);
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
  (id, name, setName, setIsEdit, setAlertOpen) => async (dispatch) => {
    try {
      dispatch(editTeamPending());
      const team = await editTeam(id, name);
      dispatch(editTeamSuccess(team));
      setName("");
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
