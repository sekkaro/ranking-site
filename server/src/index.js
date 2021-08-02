import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import authRoute from "./routes/auth";
import playerRoute from "./routes/players";
import leagueRoute from "./routes/leagues";

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
  app.use("/api/players", playerRoute);
  app.use("/api/leagues", leagueRoute);

  app.listen(port, () => {
    console.log("Backend server is running");
  });
};

main();
