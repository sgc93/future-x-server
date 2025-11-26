import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/requireRole";

const userRouter = Router();

userRouter.get("/", userController.findAll);
userRouter.get("/:id", userController.findOne);
userRouter.delete(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  userController.delete
);

export default userRouter;
