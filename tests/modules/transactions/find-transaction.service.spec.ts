import FindTransactionService from "../../../src/modules/transactions/services/find.service";
import { AppError } from "../../../src/shared/middlewares/error.middleware";

describe('FindTransactionService', () => {
  let repositoryMock: any;
  let service: FindTransactionService;

  beforeEach(() => {
    repositoryMock = {
      findById: jest.fn(),
    };

    service = new FindTransactionService(repositoryMock);
  });

  it('should allow ADMIN to get any transaction', async () => {
    repositoryMock.findById.mockResolvedValue({
      id: '1',
      userId: 'another-user',
    });

    const result = await service.execute('user-1', 'ADMIN', '1');

    expect(result.id).toBe('1');
  });

  it('should allow USER to get own transaction', async () => {
    repositoryMock.findById.mockResolvedValue({
      id: '1',
      userId: 'user-1',
    });

    const result = await service.execute('user-1', 'USER', '1');

    expect(result.id).toBe('1');
  });

  it('should throw if USER tries to access another user transaction', async () => {
    repositoryMock.findById.mockResolvedValue({
      id: '1',
      userId: 'another-user',
    });

    await expect(
      service.execute('user-1', 'USER', '1')
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw if transaction not found', async () => {
    repositoryMock.findById.mockResolvedValue(null);

    await expect(
      service.execute('user-1', 'USER', '1')
    ).rejects.toBeInstanceOf(AppError);
  });
});