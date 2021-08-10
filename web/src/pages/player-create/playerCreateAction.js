import { createPlayer } from "../../api/playersApi";
import { getAllPositionsFast } from "../../api/positionsApi";
import { getAllTeamsFast } from "../../api/teamsApi";
import { logout } from "../login/loginAction";
import {
  createPlayerFail,
  createPlayerPending,
  createPlayerSuccess,
  fetchPositionNamesFail,
  fetchPositionNamesPending,
  fetchPositionNamesSuccess,
  fetchTeamNamesFail,
  fetchTeamNamesPending,
  fetchTeamNamesSuccess,
} from "./playerCreateSlice";

export const addPlayer =
  (
    history,
    { name, team, number, birthday, age, height, weight, origin, position }
  ) =>
  async (dispatch) => {
    try {
      dispatch(createPlayerPending());
      await createPlayer(
        name,
        team,
        number,
        birthday,
        age,
        height,
        weight,
        origin,
        position
      );
      dispatch(createPlayerSuccess());
      history.push("/admin"); // todo /players
    } catch (err) {
      console.log(err);
      if (err.message === "Forbidden") {
        dispatch(logout(err.message));
        dispatch(createPlayerFail(""));
      } else {
        dispatch(createPlayerFail(err.message));
        alert(err.message);
      }
    }
  };

export const fetchPositionNames = () => async (dispatch) => {
  try {
    dispatch(fetchPositionNamesPending());
    const result = await getAllPositionsFast();
    dispatch(fetchPositionNamesSuccess(result));
  } catch (err) {
    console.log(err);
    if (err.message === "Forbidden") {
      dispatch(logout(err.message));
      dispatch(fetchPositionNamesFail(""));
    } else {
      dispatch(fetchPositionNamesFail(err.message));
    }
  }
};

export const fetchTeamNames = (keyword = "", league = "") => async (dispatch) => {
  try {
    dispatch(fetchTeamNamesPending());
    const result = await getAllTeamsFast(keyword, league);
    dispatch(fetchTeamNamesSuccess(result));
  } catch (err) {
    console.log(err);
    if (err.message === "Forbidden") {
      dispatch(logout(err.message));
      dispatch(fetchTeamNamesFail(""));
    } else {
      dispatch(fetchTeamNamesFail(err.message));
    }
  }
};