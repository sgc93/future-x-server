import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required().messages({'string.required': 'Email is required'}),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "string.min": "Password should be atleast 6 characters" })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .messages({ "string.min": "Password should be atleast 6 characters" })
});
