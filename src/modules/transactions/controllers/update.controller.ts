import { Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import TransactionsRepository from "../repositories/transactions.repository";
import { prisma } from "../../../shared/database/prisma";
import UpdateTransactionService from "../services/update.service";
import UpdateTransactionDTO from "../dtos/update.dto";

export default async function UpdateController(req: AuthenticatedRequest, res: Response) {
  const updateTransactionDTO = req.body as UpdateTransactionDTO;
  const transactionRepository = new TransactionsRepository(prisma);
  const updateService = new UpdateTransactionService(transactionRepository);
  const updatedTransaction = await updateService.execute(req.params.id as string, req.user!.id, req.user!.role, updateTransactionDTO);
  return res.ok(updatedTransaction);
}