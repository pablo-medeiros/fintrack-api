import { Request, Response } from "express";
import loginValidator from "../validators/login.validator";
import UsersRepository from "../repositories/users.repository";
import TokenService from "../../../shared/services/token.service";
import PasswordService from "../services/password.service";
import { prisma } from "../../../shared/database/prisma";
import LoginService from "../services/login.service";

export default async function loginController(req: Request, res: Response) {
  loginValidator(req.body);
  const { email, password } = req.body;
  const usersRepository = new UsersRepository(prisma);
  const tokenService = new TokenService();
  const passwordService = new PasswordService();
  const loginService = new LoginService(usersRepository, tokenService, passwordService);
  const result = await loginService.execute(email, password);
  return res.json(result);
}