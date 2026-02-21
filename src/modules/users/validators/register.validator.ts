import { AppError } from "../../../shared/middlewares/error.middleware";
import Joi from "joi";

export const emailSchema = Joi.string().email().max(255).required();
export const passwordSchema = Joi.string().min(6).max(100).required();
export const nameSchema = Joi.string().min(1).max(50).required();
export const RegisterSchema = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
export default function registerValidator(body: any) {
  const { error: registerError } = RegisterSchema.validate(body);
  if (registerError) {
    throw new AppError(registerError.details[0].message, 400);
  }
}