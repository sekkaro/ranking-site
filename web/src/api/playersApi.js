import axios from "axios";
import { limit } from "../constants";

const authUri = process.env.REACT_APP_API_URI + "/players";

export const getAllPlayers = (page, keyword) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `${authUri}?page=${page - 1}&limit=${limit}&keyword=${keyword}`,
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
