import Joi from "joi";
import { AppError } from "../../../shared/middlewares/error.middleware";

export const RefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export default function refreshTokenValidator(body: any) {
  const { error: refreshTokenError } = RefreshTokenSchema.validate(body);
  if (refreshTokenError) {
    throw new AppError(refreshTokenError.details[0].message, 400);
  }
}