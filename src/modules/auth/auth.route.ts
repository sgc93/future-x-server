import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../middleware/joi.validate";
import { loginSchema, registerSchema } from "./auth.validator";
import { authMiddleware } from "../../middleware/auth.middleware";

const authRouter = Router();

authRouter.get("/me", authMiddleware, authController.me);
authRouter.post('/register', validate(registerSchema), authController.register)
authRouter.post('/login', validate(loginSchema), authController.login)

export default authRouter;