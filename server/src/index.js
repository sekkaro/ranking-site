import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import authRoute from "./routes/auth";
import profileRoute from "./routes/profiles";
import leagueRoute from "./routes/leagues";
import teamRoute from "./routes/teams";
import positionRoute from "./routes/positions";

const main = () => {
  const app = express();

  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(morgan("common"));

  const port = process.env.PORT || 3001;

  app.use("/api/auth", authRoute);
  app.use("/api/players", profileRoute);
  app.use("/api/leagues", leagueRoute);
  app.use("/api/teams", teamRoute);
  app.use("/api/positions", positionRoute);

  app.listen(port, () => {
    console.log("Backend server is running");
  });
};

main();
