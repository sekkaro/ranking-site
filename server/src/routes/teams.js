import express from "express";
import { userAuth } from "../middlewares/authorization";
import Team from "../models/Team";

const router = express.Router();

// create new team
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const team = new Team({
      name,
    });

    const newTeam = await team.save();
    res.json(newTeam);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// get all teams (paging)
router.get("/", userAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 0;
    const keyword = req.query.keyword || "";
    let count;
    await Team.countDocuments(
      { name: { $regex: keyword, $options: "i" } },
      (err, val) => {
        if (err) {
          throw new Error(err.message);
        }
        count = val;
      }
    );
    const result = await Team.find(
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
    res.json({ teams: result, count: Math.ceil(count / limit) });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// edit a team
router.put("/:id/edit", userAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;

    const team = await Team.findByIdAndUpdate(id, { name }, { new: true });
    res.json(team);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// delete a team
router.delete("/:id", userAuth, async (req, res) => {
  try {
    const id = req.params.id;

    await Team.findByIdAndDelete(id);

    res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

export default router;
