import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "string.min": "Password should be atleast 6 characters" })
});