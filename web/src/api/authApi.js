import axios from "axios";

const authUri = process.env.REACT_APP_API_URI + "/auth";

export const verify = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      //   const token = sessionStorage.getItem("");
      const result = await axios.get(`${authUri}/verify`, {
        headers: {
          Authorization: token,
        },
      });

      if (result.message) {
        throw new Error("Forbidden");
      }

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
