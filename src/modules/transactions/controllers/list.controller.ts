import { Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { prisma } from "../../../shared/database/prisma";
import { PaginationDTO } from "../../../shared/dtos/pagination.dto";
import TransactionsRepository from "../repositories/transactions.repository";
import ListTransactionsService from "../services/list.service";

export default async function ListController(req: AuthenticatedRequest, res: Response) {
  const paginationDTO: PaginationDTO = req.query as any;
  const userId = (req.params['id'] as string) ?? req.user!.id;
  const transactionsRepository = new TransactionsRepository(prisma);
  const listService = new ListTransactionsService(transactionsRepository);
  const listTransactions = await listService.execute(userId,paginationDTO.page,paginationDTO.limit);
  return res.pagination(listTransactions.data,listTransactions.meta);
}