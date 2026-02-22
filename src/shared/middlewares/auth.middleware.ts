import { NextFunction, Request } from "express";
import TokenService from "../services/token.service";
import { AppError } from "./error.middleware";
import { $Enums } from "@prisma/client";

const tokenService = new TokenService();

type RequestUser = {
  id: string;
  role: $Enums.Role;
}

export interface AuthenticatedRequest extends Request {
  user?: RequestUser;
}

export default async function AuthMiddleware(req: AuthenticatedRequest, _res: any, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    throw new AppError('Unauthorized', 401);
  }
  const [, token] = authHeader.split(' ');
  const decoded = tokenService.verifyToken(token);
  if (!decoded) {
    throw new AppError('Unauthorized', 401);
  }
  req.user = {
    id: decoded.userId,
    role: decoded.role||'USER',
  }
  next();
}
