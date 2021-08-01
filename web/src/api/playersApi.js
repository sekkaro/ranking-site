import axios from "axios";
import { limit } from "../constants";

const authUri = process.env.REACT_APP_API_URI + "/players";

export const getAllPlayers = (page, keyword, sort, type) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `${authUri}?page=${
          page - 1
        }&limit=${limit}&keyword=${keyword}&sort=${sort}&type=${type}`,
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
      const result = await axios.get(`${authUri}/${id}`, {
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
