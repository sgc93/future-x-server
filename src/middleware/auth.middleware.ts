import { NextFunction, Request, Response } from "express";
import { Code, Status } from "../common/response/response.enum";
import { HttpResponse } from "../common/response/response";
import { verifyAccessToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(Status.UNAUTHORIZED)
      .json(
        new HttpResponse(
          Code.UNAUTHORIZED,
          Status.UNAUTHORIZED,
          "You are not authorized for this action"
        )
      );
  }

  const token = authHeader.split(" ")[1] ?? "";

  try {
    const decoded = verifyAccessToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res
      .status(Status.UNAUTHORIZED)
      .json(
        new HttpResponse(
          Code.UNAUTHORIZED,
          Status.UNAUTHORIZED,
          "Invalid or expired token"
        )
      );
  }
};
