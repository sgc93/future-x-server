import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import config from "./config/config";

export const createApp = () => {
  const app = express();

  app.disable("x-powered-by");

  app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cors({ origin: config.cors.origin, credentials: true }))
    .use(helmet());

  if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
  }
  
  app.use("/users", (req, res) => {
    res.status(200).json({ message: "Users list goeas here" });
  })

  app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is Running ..." });
  })

  app.use((req, res) => {
    res.status(404).json({ message: "Route not found!" });
  });

  return app;
};
