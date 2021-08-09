import express from "express";
import { userAuth } from "../middlewares/authorization";
import Position from "../models/Position";

const router = express.Router();

// create new position
router.post("/", userAuth, async (req, res) => {
  try {
    const { name } = req.body;

    const position = new Position({
      name,
    });

    const newPosition = await position.save();
    res.json(newPosition);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// get all positions (paging)
router.get("/", userAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 0;
    const keyword = req.query.keyword || "";
    let count;
    await Position.countDocuments(
      { name: { $regex: keyword, $options: "i" } },
      (err, val) => {
        if (err) {
          throw new Error(err.message);
        }
        count = val;
      }
    );
    const result = await Position.find(
      { name: { $regex: keyword, $options: "i" } },
      null,
      {
        limit,
        skip: limit * page,
        sort: {
          createdAt: "desc",
        },
      }
    );
    res.json({ positions: result, count: Math.ceil(count / limit) });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// get all position names
router.get("/fast", userAuth, async (req, res) => {
  try {
    const result = await Position.find({}).select("name");
    res.json({ positions: result });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// edit a position
router.put("/:id/edit", userAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const position = await Position.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.json(position);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// delete a position
router.delete("/:id", userAuth, async (req, res) => {
  try {
    const id = req.params.id;

    await Position.findByIdAndDelete(id);

    res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

export default router;
