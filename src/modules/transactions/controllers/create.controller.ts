import { Response } from "express";
import { AuthenticatedRequest } from "../../../shared/middlewares/auth.middleware";
import createValidator from "../validators/create.validator";
import CreateTransactionDTO from "../dtos/create.dto";
import TransactionsRepository from "../repositories/transactions.repository";
import { prisma } from "../../../shared/database/prisma";
import CreateService from "../services/create.service";

export default async function CreateController(req: AuthenticatedRequest, res: Response) {
  createValidator(req.body);
  const createTransactionDTO = new CreateTransactionDTO(
    req.body.title,
    req.body.type,
    req.body.category,
    req.body.date,
    req.body.amount
  );
  const transactionRepository = new TransactionsRepository(prisma);
  const createService = new CreateService(transactionRepository);
  const createdTransaction = await createService.execute(req.user!.id, createTransactionDTO);
  return res.json(createdTransaction);
}