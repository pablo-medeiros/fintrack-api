import { transferableAbortController } from "node:util";
import CreateTransactionDTO from "../dtos/create.dto";
import TransactionsRepository from "../repositories/transactions.repository";

export default class CreateService {

  constructor(readonly transactionsRepository: TransactionsRepository) {}

  execute(userId: string, data: CreateTransactionDTO) {
    return this.transactionsRepository.create({
      userId,
      ...data,
    });
  }
}