import { Request, Response } from "express";
import { UserService } from "./user.service";
import { Code, Status } from "../../common/response/response.enum";
import { HttpResponse } from "../../common/response/response";

const service = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    const user = await service.create(req.body);
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
    const users = await service.findAll();
    return res.json(
      new HttpResponse(Code.OK, Status.OK, "Users fetched successfully.", users)
    );
  }

  async findOne(req: Request, res: Response) {
    const user = await service.findOne(Number(req.params.id));

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
    const user = await service.findOne(id);

    if (!user) {
      res
        .status(Status.NOT_FOUND)
        .json(
          new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "User not found!")
        );
    }

    const updated = await service.update(id, req.body);
    return res.json(
      new HttpResponse(Code.OK, Status.OK, "User updated successfully", updated)
    );
  }

  async delete(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const user = await service.findOne(id);

    if (!user) {
      res
        .status(Status.NOT_FOUND)
        .json(
          new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "User not found!")
        );
    }

    await service.delete(Number(req.params.id));
    return res.json(
      new HttpResponse(Code.OK, Status.OK, "User deleted successfully")
    );
  }
}
