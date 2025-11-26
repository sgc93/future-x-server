import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../middleware/joi.validate";
import { loginSchema, registerSchema } from "./auth.validator";

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), authController.register)
authRouter.post('/login', validate(loginSchema), authController.login)

export default authRouter;