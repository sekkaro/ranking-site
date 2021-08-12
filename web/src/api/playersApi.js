import axios from "axios";
import { limit } from "../constants";

const playersUri = process.env.REACT_APP_API_URI + "/players";

export const getAllPlayers = (page, name, number, league, team) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `${playersUri}?page=${
          page - 1
        }&limit=${limit}&name=${name}&number=${number}&league=${league}&team=${team}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (result.data.message) {
        throw new Error(result.data.message);
      }

      // console.log(result.data);

      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });

export const getPlayerDetail = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(`${playersUri}/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (result.data.message) {
        throw new Error(result.data.message);
      }

      // console.log(result.data);

      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });

export const editPlayerDetail = (player) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `${playersUri}/${player._id}/edit`,
        {
          ...player,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (result.data.message) {
        throw new Error(result.data.message);
      }

      // console.log(result.data);

      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });

export const deletePlayer = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.delete(`${playersUri}/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      if (result.data.message) {
        throw new Error(result.data.message);
      }

      // console.log(result.data);

      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });

export const createPlayer = (
  name,
  team,
  number,
  birthday,
  age,
  height,
  weight,
  origin,
  position
) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `${playersUri}`,
        {
          name,
          team: team._id,
          number,
          birthday,
          age,
          height,
          weight,
          origin,
          position,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (result.data.message) {
        throw new Error(result.data.message);
      }

      // console.log(result.data);

      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });
