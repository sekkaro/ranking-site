import express from "express";
import { userAuth } from "../middlewares/authorization";
import Team from "../models/Team";

const router = express.Router();

// create new team
router.post("/", userAuth, async (req, res) => {
  try {
    const { name, league } = req.body;

    let team = await Team.findOne({ name, league });

    if (team) {
      return res.json({ message: "Duplicate Error" });
    }

    team = new Team({
      name,
      league,
    });

    const newTeam = await team.save();
    res.json(newTeam);
  } catch (err) {
    console.log(err);
    if (err?.code === 11000) {
      return res.json({ message: "Duplicate Error" });
    }
    res.json({ message: "Server Error" });
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
    ).populate("league");
    res.json({
      teams: result,
      count: Math.ceil(count / limit),
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// get all team names
router.get("/fast", userAuth, async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const result = await Team.find({
      name: { $regex: keyword, $options: "i" },
    }).select("name");
    res.json({ teams: result });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// edit a team
router.put("/:id/edit", userAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, league } = req.body;

    const team = await Team.findByIdAndUpdate(
      id,
      { name, league },
      { new: true }
    ).populate("league");
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
