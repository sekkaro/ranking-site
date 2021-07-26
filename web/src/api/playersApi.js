import axios from "axios";

const authUri = process.env.REACT_APP_API_URI + "/players";

export const getAllPlayers = () =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(`${authUri}`, {
        headers: {
          Authorization: token,
        },
      });

      if (result.data.message) {
        throw new Error(result.data.message);
      }

      resolve(result.data);
    } catch (err) {
      reject(err);
    }
  });
