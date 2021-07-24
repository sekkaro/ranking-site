import express from "express";
import { userAuth } from "../middlewares/authorization";

const router = express.Router();

router.get("/verify", userAuth, (req, res) => {
  const userId = req.userId;
  res.json({ userId });
});

export default router;
