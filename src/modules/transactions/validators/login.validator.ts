import { AppError } from "../../../shared/middlewares/error.middleware";
import Joi from "joi";
import { emailSchema, passwordSchema } from "./register.validator";

export const LoginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});
export default function loginValidator(body: any) {
  const { error: loginError } = LoginSchema.validate(body);
  if (loginError) {
    throw new AppError(loginError.details[0].message, 400);
  }
}