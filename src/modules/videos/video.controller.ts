import { Request, Response } from "express";
import { Code, Status } from "../../common/response/response.enum";
import { HttpResponse } from "../../common/response/response";
import { videoService } from "./video.service";

class VideoController {
  async create(req: Request, res: Response) {
    const user = await videoService.create(req.body);
    return res
      .status(Status.CREATED)
      .json(
        new HttpResponse(
          Code.CREATED,
          Status.CREATED,
          "Video saved successfully.",
          user
        )
      );
  }

  async findAll(req: Request, res: Response) {
    const users = await videoService.findAll();
    return res.json(
      new HttpResponse(
        Code.OK,
        Status.OK,
        users.length > 0
          ? "Videos fetched successfully."
          : "No Video saved yet.",
        users
      )
    );
  }

  async findOne(req: Request, res: Response) {
    const user = await videoService.findOne(Number(req.params.id));

    if (!user) {
      res
        .status(Status.NOT_FOUND)
        .json(
          new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "Video not found!")
        );
    }

    return res.json(
      new HttpResponse(
        Code.OK,
        Status.OK,
        "Video data fetched successfully.",
        user!
      )
    );
  }

  async update(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const user = await videoService.findOne(id);

    if (!user) {
      res
        .status(Status.NOT_FOUND)
        .json(
          new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "Video not found!")
        );
    }

    const updated = await videoService.update(id, req.body);
    return res.json(
      new HttpResponse(Code.OK, Status.OK, "Video updated successfully", updated)
    );
  }

  async delete(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const user = await videoService.findOne(id);

    if (!user) {
      res
        .status(Status.NOT_FOUND)
        .json(
          new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "Video not found!")
        );
    }

    await videoService.delete(Number(req.params.id));
    return res.json(
      new HttpResponse(Code.OK, Status.OK, "Video deleted successfully")
    );
  }
}

export const videoController = new VideoController();
