import { AppError } from "../../../shared/middlewares/error.middleware";
import TokenService from "../../../shared/services/token.service";
import CreateTransactionDTO from "../dtos/create.dto";
import TransactionsRepository from "../repositories/transactions.repository";

export default class CreateService {

  constructor(readonly transactionsRepository: TransactionsRepository) {}

  async execute(userId: string, data: CreateTransactionDTO) {
    
  }
}