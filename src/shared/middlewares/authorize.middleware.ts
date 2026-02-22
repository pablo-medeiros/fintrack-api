import { $Enums } from "@prisma/client";
import { AuthenticatedRequest } from "./auth.middleware";
import { NextFunction, Response } from "express";
import { AppError } from "./error.middleware";

export default function authorize(...allowedRoles: $Enums.Role[]) {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }
    if(!allowedRoles.includes(req.user.role)) {
      throw new AppError('Forbidden', 403);
    }
    next();
  }
}