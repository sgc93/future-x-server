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
        .status(Status.BAD_REQUEST)
        .json(
          new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, result.msg)
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
        .status(Status.BAD_REQUEST)
        .json(
          new HttpResponse(Code.BAD_REQUEST, Status.BAD_REQUEST, result.msg)
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
