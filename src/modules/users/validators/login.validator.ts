import Joi from "joi";
import { emailSchema, passwordSchema } from "./register.validator";

export const LoginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});