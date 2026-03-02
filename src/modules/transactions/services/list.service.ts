import TransactionsRepository from "../repositories/transactions.repository";

export default class ListTransactionsService {

  constructor(readonly transactionsRepository: TransactionsRepository) {}

  async execute(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const transactions = await this.transactionsRepository.findManyByUser(userId, skip, limit);
    const total = await this.transactionsRepository.countByUser(userId);
    return {
      data: transactions,
      meta: {
        total,
        page,
        limit
      }
    };
  }
}