import axios from "axios";

const authUri = process.env.REACT_APP_API_URI + "/auth";

export const verify = () =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(`${authUri}/verify`, {
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

export const loginUser = (token, email, name) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(
        `${authUri}/login`,
        {
          email,
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

      localStorage.setItem("token", token);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
