import express from "express";
import { userAuth } from "../middlewares/authorization";
import User from "../models/User";

const router = express.Router();

router.get("/me", userAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({
      googleId: userId,
    });

    if (!user) {
      return res.json({ message: "user not found" });
    }

    const { email, name } = user._doc;

    res.json({ email, name });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/login", userAuth, async (req, res) => {
  try {
    const { email, name } = req.body;
    const userId = req.userId;

    let user = await User.findOneAndUpdate(
      { googleId: userId },
      { email, name },
      { new: true }
    );

    if (!user) {
      const newUser = new User({
        googleId: userId,
        email,
        name,
      });
      user = await newUser.save();
    }

    res.json({ status: "success" });
  } catch (err) {
    res.json({ message: err.message });
  }
});

export default router;
