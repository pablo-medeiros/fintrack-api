import { Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import MeService from "../services/me.service";
import UsersRepository from "../repositories/users.repository";
import { prisma } from "../../../shared/database/prisma";

export default async function meController(req: AuthenticatedRequest, res: Response) {
  const usersRepository = new UsersRepository(prisma);
  const meService = new MeService(usersRepository);
  const user = await meService.execute(req.user!.id);
  res.json({
    status: 'success',
    data: user
  });
}