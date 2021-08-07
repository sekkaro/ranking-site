import axios from "axios";
import { limit } from "../constants";

const teamsUri = process.env.REACT_APP_API_URI + "/teams";

export const getAllTeams = (page, keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `${teamsUri}?page=${page - 1}&limit=${limit}&keyword=${keyword}`,
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

export const createTeam = (name, league) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        teamsUri,
        {
          name,
          league,
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

export const editTeam = (id, name, league) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `${teamsUri}/${id}/edit`,
        {
          name,
          league,
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

export const deleteTeam = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.delete(`${teamsUri}/${id}`, {
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
