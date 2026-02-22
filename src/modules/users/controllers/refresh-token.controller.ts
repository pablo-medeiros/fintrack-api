import { Request, Response } from "express";
import refreshTokenValidator from "../validators/refresh-token.validator";
import RefreshTokenService from "../services/refresh-token.service";
import UsersRepository from "../repositories/users.repository";
import TokenService from "../../../shared/services/token.service";
import { prisma } from "../../../shared/database/prisma";

export default async function refreshTokenController(req: Request, res: Response) {
  refreshTokenValidator(req.body);
  const { refreshToken } = req.body;
  const usersRepository = new UsersRepository(prisma);
  const tokenService = new TokenService();
  const refreshTokenService = new RefreshTokenService(usersRepository, tokenService);
  const newTokens = await refreshTokenService.execute(refreshToken);
  return res.json(newTokens);
}