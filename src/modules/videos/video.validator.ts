import Joi from "joi";

export const createVideoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  youtube_id: Joi.string().required(),
  category: Joi.string().required(),
  duration: Joi.string().required(),
})