import express from "express";
import mongoose from "mongoose";
import { userAuth } from "../middlewares/authorization";
import Profile from "../models/Profile";
import Team from "../models/Team";

const router = express.Router();

// create new profile
router.post("/", userAuth, async (req, res) => {
  try {
    const {
      name,
      team,
      number,
      birthday,
      age,
      height,
      weight,
      origin,
      position,
    } = req.body;

    let profile = await Profile.findOne({ team, number });

    if (profile) {
      return res.json({ message: "Duplicate Error" });
    }

    profile = new Profile({
      name,
      team,
      number,
      birthday,
      age,
      height,
      weight,
      origin,
      position,
    });

    await profile.save();
    res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// get all profiles (paging)
router.get("/", userAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 0;
    const name = req.query.name || "";
    const number = req.query.number || "";
    const league = req.query.league || "";
    const team = req.query.team || "";
    // let count;
    let query = {
      name: { $regex: name, $options: "i" },
    };
    if (number && !isNaN(number)) {
      query.number = parseInt(number);
    }
    if (league) {
      if (team) {
        query.team = mongoose.Types.ObjectId(team);
      } else {
        const teams = await Team.find({
          league: mongoose.Types.ObjectId(league),
        }).distinct("_id");

        query.team = { $in: teams };
      }
    }

    // console.log(teams);

    // console.log(query);
    // await Profile.countDocuments(query, (err, val) => {
    //   if (err) {
    //     throw new Error(err.message);
    //   }
    //   count = val;
    // });
    const result = await Profile.find(query, null, {
      limit,
      skip: limit * page,
      sort: {
        createdAt: "asc",
      },
    })
      .populate({
        path: "team",
        populate: { path: "league" },
      })
      .select("team name number");

    res.json({ players: result, count: Math.ceil(result.length / limit) });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// get a player
router.get("/:id", userAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const player = await Profile.findById(id)
      .populate({
        path: "team",
        populate: { path: "league" },
      })
      .populate("position");

    res.json(player);
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// delete a player
router.delete("/:id", userAuth, async (req, res) => {
  try {
    const id = req.params.id;

    await Profile.findByIdAndDelete(id);

    res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
});

// // get all players (paging)
// router.get("/", userAuth, async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit) || 20;
//     const page = parseInt(req.query.page) || 0;
//     const keyword = req.query.keyword || "";
//     const sort = req.query.sort || "createdAt";
//     const type = req.query.type || "asc";
//     let count;
//     await Player.countDocuments(
//       { name: { $regex: keyword, $options: "i" } },
//       (err, val) => {
//         if (err) {
//           throw new Error(err.message);
//         }
//         count = val;
//       }
//     );
//     const result = await Player.find(
//       { name: { $regex: keyword, $options: "i" } },
//       null,
//       {
//         limit,
//         skip: limit * page,
//         sort: {
//           [sort]: type,
//         },
//       }
//     ).select("matches goals assists name");
//     // .populate("creator");
//     // const { creatorId, ...others } = result._doc;
//     res.json({ players: result, count: Math.ceil(count / limit) });
//   } catch (err) {
//     console.log(err);
//     res.json({ message: err.message });
//   }
// });

// // get a player
// router.get("/:id", userAuth, async (req, res) => {
//   try {
//     const id = req.params.id;

//     const player = await Player.findById(id).populate("creator");

//     res.json(player);
//   } catch (err) {
//     console.log(err);
//     res.json({ message: err.message });
//   }
// });

// // edit a player
// router.put("/:id/edit", userAuth, async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { matches, goals, assists } = req.body;

//     await Player.findByIdAndUpdate(id, { matches, goals, assists });

//     res.json({ status: "success" });
//   } catch (err) {
//     console.log(err);
//     res.json({ message: err.message });
//   }
// });

// // delete a player
// router.delete("/:id", userAuth, async (req, res) => {
//   try {
//     const id = req.params.id;

//     await Player.findByIdAndDelete(id);

//     res.json({ status: "success" });
//   } catch (err) {
//     console.log(err);
//     res.json({ message: err.message });
//   }
// });

export default router;
