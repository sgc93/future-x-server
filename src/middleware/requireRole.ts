import { Request, Response, NextFunction } from "express";
import { Code, Status } from "../common/response/response.enum";
import { HttpResponse } from "../common/response/response";

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!(req as any).user || !roles.includes((req as any).user.role)) {
      return res
        .status(Status.FORBIDDEN)
        .json(
          new HttpResponse(Code.FORBIDDEN, Status.FORBIDDEN, "Access denied")
        );
    }

    next();
  };
};
