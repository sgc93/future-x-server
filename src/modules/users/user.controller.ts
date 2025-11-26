import { Request, Response } from "express";
import { Code, Status } from "../../common/response/response.enum";
import { HttpResponse } from "../../common/response/response";
import { userService } from "./user.service";
class UserController {
  async create(req: Request, res: Response) {
    const user = await userService.create(req.body);
    return res
      .status(Status.CREATED)
      .json(
        new HttpResponse(
          Code.CREATED,
          Status.CREATED,
          "User created successfully.",
          user
        )
      );
  }

  async findAll(req: Request, res: Response) {
    const users = await userService.findAll();
    return res.json(
      new HttpResponse(
        Code.OK,
        Status.OK,
        users.length > 0
          ? "Users fetched successfully."
          : "No user regestered yet.",
        users
      )
    );
  }

  async findOne(req: Request, res: Response) {
    const user = await userService.findOne(Number(req.params.id));

    if (!user) {
      res
        .status(Status.NOT_FOUND)
        .json(
          new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "User not found!")
        );
    }

    return res.json(
      new HttpResponse(
        Code.OK,
        Status.OK,
        "User Data fetched successfully.",
        user!
      )
    );
  }

  async update(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const user = await userService.findOne(id);

    if (!user) {
      res
        .status(Status.NOT_FOUND)
        .json(
          new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "User not found!")
        );
    }

    const updated = await userService.update(id, req.body);
    return res.json(
      new HttpResponse(Code.OK, Status.OK, "User updated successfully", updated)
    );
  }

  async delete(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const user = await userService.findOne(id);

    if (!user) {
      res
        .status(Status.NOT_FOUND)
        .json(
          new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "User not found!")
        );
    }

    await userService.delete(Number(req.params.id));
    return res.json(
      new HttpResponse(Code.OK, Status.OK, "User deleted successfully")
    );
  }
}

export const userController = new UserController();
