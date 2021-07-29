import express from "express";
import { userAuth } from "../middlewares/authorization";
import Player from "../models/Player";

const router = express.Router();

// create new player
router.post("/", userAuth, async (req, res) => {
  try {
    // const creator = req.userId;
    const { name, age, height, creatorId } = req.body;

    const player = new Player({
      name,
      age,
      height,
      creatorId,
    });

    await player.save();
    res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// get all players (paging)
router.get("/", userAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 0;
    let count;
    await Player.countDocuments({}, (err, val) => {
      if (err) {
        throw new Error(err.message);
      }
      count = val;
    });
    const result = await Player.find({}, null, {
      limit,
      skip: limit * page,
    }).select("matches goals assists name");
    // .populate("creator");
    // const { creatorId, ...others } = result._doc;
    res.json({ players: result, count: Math.ceil(count / limit) });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// get a player
router.get("/:id", userAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const player = await Player.findById(id).populate("creator");

    res.json(player);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

export default router;
