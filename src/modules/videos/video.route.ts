import { Router } from "express";
import { videoController } from "./video.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { requireRole } from "../../middleware/requireRole";

const videoRouter = Router();

videoRouter.get("/:id", videoController.findOne);
videoRouter.delete(
  "/:id",
  authMiddleware,
  requireRole(["admin"]),
  videoController.delete
);
videoRouter.get("/", videoController.findAll);

export default videoRouter;
