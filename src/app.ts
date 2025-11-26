import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import config from "./config/config";
import { Code, Status } from "./common/response/response.enum";
import { HttpResponse } from "./common/response/response";
import userRouter from "./modules/users/user.routes";
import authRouter from "./modules/auth/auth.route";

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

  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);

  app.get("/", (_, res) => {
    res
      .status(Status.OK)
      .json(new HttpResponse(Code.OK, Status.OK, "Server is running ..."));
  });

  app.use((_, res) => {
    res
      .status(Status.NOT_FOUND)
      .json(
        new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "Route not found!")
      );
  });

  return app;
};
