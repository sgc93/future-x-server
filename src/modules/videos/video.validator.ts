import Joi from "joi";

export const createVideoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  youtubeId: Joi.string().required(),
  category: Joi.string().required(),
  duration: Joi.string().required()
});