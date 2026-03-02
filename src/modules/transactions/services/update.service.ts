import { AppError } from "../../../shared/middlewares/error.middleware";
import UpdateTransactionDTO from "../dtos/update.dto";
import TransactionsRepository from "../repositories/transactions.repository";

export default class UpdateTransactionService {

  constructor(readonly transactionsRepository: TransactionsRepository) {}

  async execute(id: string, userId: string, role: string, data: UpdateTransactionDTO) {
    const transaction = await this.transactionsRepository.findById(id);
    if(!transaction || (transaction.userId !== userId && role !== "ADMIN") || transaction.deletedAt) {
      throw new AppError("Transaction not found or you don't have permission to update it", 404);
    }
    return this.transactionsRepository.update(id, data);
  }
}