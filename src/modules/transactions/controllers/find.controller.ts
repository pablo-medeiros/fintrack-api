import { Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import { prisma } from "../../../shared/database/prisma";
import TransactionsRepository from "../repositories/transactions.repository";
import FindTransactionService from "../services/find.service";

export default async function FindController(req: AuthenticatedRequest, res: Response) {
  const transactionsRepository = new TransactionsRepository(prisma);
  const findService = new FindTransactionService(transactionsRepository);
  const foundTransaction = await findService.execute(req.user!.id, req.user!.role, req.params['id'] as string);
  return res.ok(foundTransaction);
}