import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import authRoute from "./routes/auth";

const main = () => {
  const app = express();

  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(morgan("common"));

  const port = process.env.PORT || 3001;

  app.use("/api/auth", authRoute);

  app.listen(port, () => {
    console.log("Backend server is running");
  });
};

main();
