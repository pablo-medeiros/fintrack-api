import { AppError } from "../../../shared/middlewares/error.middleware";
import Joi from "joi";

export const CreateSchema = Joi.object({
  title: Joi.string().max(255).min(2).required(),
  type: Joi.string().valid("income", "outcome").required(),
  category: Joi.string().min(2).max(255).default("Uncategorized"),
  date: Joi.date().required(),
  amount: Joi.number().positive().required()
});
export default function createValidator(body: any) {
  const { error: createError } = CreateSchema.validate(body);
  if (createError) {
    throw new AppError(createError.details[0].message, 400);
  }
}