import { AppError } from "../../../shared/middlewares/error.middleware";
import TransactionsRepository from "../repositories/transactions.repository";

export default class DeleteTransactionService {

  constructor(readonly transactionsRepository: TransactionsRepository) {}

  async execute(userId: string, role: string, transactionId: string) {
    const transaction = await this.transactionsRepository.findById(transactionId);
    if (!transaction || (transaction.userId !== userId && role !== "ADMIN") || transaction.deletedAt) {
      throw new AppError("Transaction not found or you don't have permission to delete it",404);
    }
    return this.transactionsRepository.delete(transactionId);
  }
}