import { Router } from "express";
import { validate } from "../../middleware/joi.validate";
import { createUserSchema } from "./user.validator";
import { UserController } from "./user.controller";

const userRouter = Router();
const controller = new UserController()

userRouter.post('/', validate(createUserSchema), controller.create)
userRouter.get('/', controller.findAll);
userRouter.get('/:id', controller.findOne);
userRouter.get('/:id', controller.delete);

export default userRouter;