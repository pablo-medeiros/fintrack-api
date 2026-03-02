import CreateTransactionDTO from "../../../src/modules/transactions/dtos/create.dto";
import CreateTransactionService from "../../../src/modules/transactions/services/create.service";
import { AppError } from "../../../src/shared/middlewares/error.middleware";

describe('CreateTransactionService', () => {
  let transactionsRepository: any;
  let service: CreateTransactionService;

  const userId = 'user-123';

  beforeEach(() => {
    transactionsRepository = {
      create: jest.fn()
    };

    service = new CreateTransactionService(transactionsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a transaction successfully', async () => {
    const transactionData: CreateTransactionDTO = {
      title: 'Salary',
      type: 'INCOME',
      category: 'Job',
      date: new Date(),
      amount: 5000
    };

    const createdTransaction = {
      id: 'tx-1',
      ...transactionData,
      userId
    };

    transactionsRepository.create.mockResolvedValue(createdTransaction);

    const result = await service.execute(userId, transactionData);

    expect(result).toEqual(createdTransaction);

    expect(transactionsRepository.create).toHaveBeenCalledWith({
      ...transactionData,
      userId
    });
  });

  it('should throw error if repository fails', async () => {
    transactionsRepository.create.mockRejectedValue(
      new AppError('Database error', 500)
    );

    await expect(
      service.execute(userId, {
        title: 'Salary',
        type: 'INCOME',
        category: 'Job',
        date: new Date(),
        amount: 5000
      })
    ).rejects.toThrow(AppError);
  });
});