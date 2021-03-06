import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_ID);

export const verifyToken = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        // audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      //   const userId = payload["sub"];
      // If request specified a G Suite domain:
      //   const domain = payload['hd'];
      resolve(payload);
    } catch (err) {
      resolve(err);
    }
  });
