import { verifyToken } from "../utils/googleAuth";

export const userAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  const decoded = await verifyToken(authorization);

  console.log(decoded);

  if (decoded.sub) {
    if (decoded.hd !== "leadia.co.kr") {
      return res.json({ message: "Forbidden" });
    }
    req.userId = decoded.sub;

    return next();
  }
  return res.json({ message: "Forbidden" });
};
