import axios from "axios";
import { limit } from "../constants";

const leaguesUri = process.env.REACT_APP_API_URI + "/leagues";

export const getAllLeagues = (page, keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `${leaguesUri}?page=${page - 1}&limit=${limit}&keyword=${keyword}`,
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

export const getAllLeaguesFast = () =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(`${leaguesUri}/fast`, {
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

export const createLeague = (name) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        leaguesUri,
        {
          name,
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

export const editLeague = (id, name) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.put(
        `${leaguesUri}/${id}/edit`,
        {
          name,
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

export const deleteLeague = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.delete(`${leaguesUri}/${id}`, {
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
