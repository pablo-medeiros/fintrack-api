import UpdateTransactionService from "../../../src/modules/transactions/services/update.service";
import { AppError } from "../../../src/shared/middlewares/error.middleware";

describe('UpdateTransactionService', () => {
  let transactionsRepositoryMock: any;
  let service: UpdateTransactionService;

  beforeEach(() => {
    transactionsRepositoryMock = {
      findById: jest.fn(),
      update: jest.fn(),
    };

    service = new UpdateTransactionService(transactionsRepositoryMock);
  });

  it('should update a transaction successfully', async () => {
    const transactionId = 'transaction-id';
    const userId = 'user-id';

    const existingTransaction = {
      id: transactionId,
      userId,
      title: 'Old title',
      amount: 100,
    };

    const updatedTransaction = {
      ...existingTransaction,
      title: 'New title',
    };

    transactionsRepositoryMock.findById.mockResolvedValue(existingTransaction);
    transactionsRepositoryMock.update.mockResolvedValue(updatedTransaction);

    const result = await service.execute(
      transactionId,
      userId,
      'USER',
      { title: 'New title' }
    );

    expect(transactionsRepositoryMock.findById)
      .toHaveBeenCalledWith(transactionId);

    expect(transactionsRepositoryMock.update)
      .toHaveBeenCalledWith(transactionId, { title: 'New title' });

    expect(result.title).toBe('New title');
  });

  it('should throw error if transaction does not exist', async () => {
    transactionsRepositoryMock.findById.mockResolvedValue(null);

    await expect(
      service.execute('invalid-id','USER', 'user-id', { title: 'New title' })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw error if user is not the owner', async () => {
    transactionsRepositoryMock.findById.mockResolvedValue({
      id: 'transaction-id',
      userId: 'another-user',
    });

    await expect(
      service.execute('transaction-id','USER', 'user-id', { title: 'New title' })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should update multiple fields', async () => {
    const transactionId = 'transaction-id';
    const userId = 'user-id';

    transactionsRepositoryMock.findById.mockResolvedValue({
      id: transactionId,
      userId,
    });

    transactionsRepositoryMock.update.mockResolvedValue({
      id: transactionId,
      userId,
      title: 'Updated',
      amount: 500,
    });

    const result = await service.execute(
      transactionId,
      userId,
      'USER',
      {
        title: 'Updated',
        amount: 500,
      }
    );

    expect(result.amount).toBe(500);
    expect(result.title).toBe('Updated');
  });
});