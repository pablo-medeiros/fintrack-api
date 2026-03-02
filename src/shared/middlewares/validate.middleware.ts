import { NextFunction, Request, Response } from "express";
import { AppError } from "./error.middleware";
import Joi from "joi";

export const validate = (schema: Joi.Schema, property: "body" | "params" | "query") => { 
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value  } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }
    req[property] = value;
    next();
  };
}