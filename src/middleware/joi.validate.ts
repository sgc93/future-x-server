import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { Code, Status } from "../common/response/response.enum";
import { HttpResponse } from "../common/response/response";

export const validate =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json(
          new HttpResponse(
            Code.BAD_REQUEST,
            Status.BAD_REQUEST,
            error.details[0]?.message ?? "Invalid data input"
          )
        );
    }

    next();
  };
