import { Request, Response } from 'express';
import registerValidator from '../validators/register.validator';
import UsersRepository from '../repositories/users.repository';
import { prisma } from '../../../shared/database/prisma';
import RegisterService from '../services/register.service';
import TokenService from '../../../shared/services/token.service';

export default async function registerController(req: Request, res: Response) {
  registerValidator(req.body);
  const usersRepository = new UsersRepository(prisma);
  const tokenService = new TokenService();
  const registerService = new RegisterService(usersRepository,tokenService)
  const data = await registerService.execute(req.body.name, req.body.email, req.body.password)
  res.status(201).json({
    status: 'created',
    data
  });
}