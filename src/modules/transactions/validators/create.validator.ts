import Joi from "joi";

export const CreateSchema = Joi.object({
  title: Joi.string().max(255).min(2).required(),
  type: Joi.string().valid("INCOME", "EXPENSE").required(),
  category: Joi.string().min(2).max(255).default("Uncategorized"),
  date: Joi.date().required(),
  amount: Joi.number().positive().required()
});
