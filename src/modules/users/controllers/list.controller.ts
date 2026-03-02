import { Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { prisma } from "../../../shared/database/prisma";
import { PaginationDTO } from "../../../shared/dtos/pagination.dto";
import UsersRepository from "../repositories/users.repository";
import ListService from "../services/list.service";

export default async function TemplateController(req: AuthenticatedRequest, res: Response) {
  const paginationDTO: PaginationDTO = req.query as any;
  const usersRepository = new UsersRepository(prisma);
  const listService = new ListService(usersRepository);
  const listUsers = await listService.execute(paginationDTO.page,paginationDTO.limit);
  return res.pagination(listUsers.data,listUsers.meta);
}