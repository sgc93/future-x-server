import { HttpResponse } from "../../common/response/response";
import { Code, Status } from "../../common/response/response.enum";
import { signAccessToken } from "../../utils/jwt";
import { Request, Response } from "express";
import { authService } from "./auth.service";

class AuthController {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body);

    if (!result.ok) {
      res
        .status(Status.UNAUTHORIZED)
        .json(
          new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, result.msg)
        );
    }

    res
      .status(201)
      .json(
        new HttpResponse(
          Code.CREATED,
          Status.CREATED,
          result.msg,
          result.data ?? {}
        )
      );
  }

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);

    if (!result.ok) {
      res
        .status(Status.UNAUTHORIZED)
        .json(
          new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, result.msg)
        );
    }

    res
      .status(201)
      .json(
        new HttpResponse(
          Code.CREATED,
          Status.CREATED,
          result.msg,
          result.data ?? {}
        )
      );
  }
}

export const authController = new AuthController();
