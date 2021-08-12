import { createPlayer, editPlayerDetail } from "../../api/playersApi";
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

export const addOrEditPlayer =
  (
    history,
    { name, team, number, birthday, age, height, weight, origin, position },
    id
  ) =>
  async (dispatch) => {
    try {
      dispatch(createPlayerPending());
      if (id) {
        await editPlayerDetail({
          _id: id,
          name,
          team: team?._id,
          number,
          birthday,
          age,
          height,
          weight,
          origin,
          position,
        });
      } else {
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
      }

      dispatch(createPlayerSuccess());
      id ? history.goBack() : history.push("/players");
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

export const fetchTeamNames =
  (keyword = "", league = "") =>
  async (dispatch) => {
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
