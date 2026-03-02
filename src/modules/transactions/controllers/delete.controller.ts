import { Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { prisma } from "../../../shared/database/prisma";
import TransactionsRepository from "../repositories/transactions.repository";
import DeleteTransactionService from "../services/delete.service";

export default async function DeleteController(req: AuthenticatedRequest, res: Response) {
  const transactionsRepository = new TransactionsRepository(prisma);
  const deleteService = new DeleteTransactionService(transactionsRepository);
  await deleteService.execute(req.user!.id, req.user!.role, req.params['id'] as string);
  return res.noContent();
}