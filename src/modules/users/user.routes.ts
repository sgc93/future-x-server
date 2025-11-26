import { Router } from "express";
import { validate } from "../../middleware/joi.validate";
import { createUserSchema } from "./user.validator";
import { userController } from "./user.controller";

const userRouter = Router();

userRouter.post("/", validate(createUserSchema), userController.create);
userRouter.get("/", userController.findAll);
userRouter.get("/:id", userController.findOne);
userRouter.delete("/:id", userController.delete);

export default userRouter;
