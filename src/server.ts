import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

export const createServer = () => {
  const app = express();

  app.disable("x-powered-by");

  app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }))
    .use(helmet());

  if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
  }

  return app;
};
