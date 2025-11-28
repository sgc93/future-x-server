import { HttpResponse } from "../../common/response/response";
import { Code, Status } from "../../common/response/response.enum";
import { signAccessToken } from "../../utils/jwt";
import { Request, Response } from "express";
import { authService } from "./auth.service";

class AuthController {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body);

    if (!result.ok) {
      return res
        .status(Status.UNAUTHORIZED)
        .json(
          new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, result.msg)
        );
    }

    return res
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
      return res
        .status(Status.UNAUTHORIZED)
        .json(
          new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, result.msg)
        );
    }

    return res
      .status(Status.OK)
      .json(
        new HttpResponse(Code.OK, Status.OK, result.msg, result.data ?? {})
      );
  }

  async me(req: Request, res: Response) {
    const result = await authService.me((req as any).user.email);

    if (!result.ok) {
      return res
        .status(Status.UNAUTHORIZED)
        .json(
          new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, result.msg)
        );
    }

    return res
      .status(Status.OK)
      .json(
        new HttpResponse(Code.OK, Status.OK, result.msg, result.data ?? {})
      );
  }
}

export const authController = new AuthController();
