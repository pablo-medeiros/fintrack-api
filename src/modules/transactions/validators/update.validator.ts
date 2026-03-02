import Joi from "joi";

export const UpdateSchema = Joi.object({
  title: Joi.string().max(255).min(2).optional(),
  amount: Joi.number().positive().optional(),
  type: Joi.string().valid("INCOME", "EXPENSE").optional(),
  category: Joi.string().min(2).max(255).optional(),
  date: Joi.date().optional(),
}).min(1).messages({
  "object.min": "At least one field must be provided to update the transaction"
});
