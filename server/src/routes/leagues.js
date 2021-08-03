import express from "express";
import { userAuth } from "../middlewares/authorization";
import League from "../models/League";

const router = express.Router();

// create new league
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const league = new League({
      name,
    });

    const newLeague = await league.save();
    res.json(newLeague);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// get all leagues (paging)
router.get("/", userAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 0;
    const keyword = req.query.keyword || "";
    let count;
    await League.countDocuments(
      { name: { $regex: keyword, $options: "i" } },
      (err, val) => {
        if (err) {
          throw new Error(err.message);
        }
        count = val;
      }
    );
    const result = await League.find(
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
    res.json({ leagues: result, count: Math.ceil(count / limit) });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// edit a league
router.put("/:id/edit", userAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const league = await League.findByIdAndUpdate(id, { name }, { new: true });
    res.json(league);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// delete a league
router.delete("/:id", userAuth, async (req, res) => {
  try {
    const id = req.params.id;

    await League.findByIdAndDelete(id);

    res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

export default router;
