import { Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import CreateTransactionDTO from "../dtos/create.dto";
import TransactionsRepository from "../repositories/transactions.repository";
import { prisma } from "../../../shared/database/prisma";
import CreateTransactionService from "../services/create.service";

export default async function CreateController(req: AuthenticatedRequest, res: Response) {
  const createTransactionDTO = req.body as CreateTransactionDTO;
  const transactionRepository = new TransactionsRepository(prisma);
  const createService = new CreateTransactionService(transactionRepository);
  const createdTransaction = await createService.execute(req.user!.id, createTransactionDTO);
  return res.created(createdTransaction);
}