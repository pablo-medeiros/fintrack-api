import DeleteTransactionService from "../../../src/modules/transactions/services/delete.service";
import { AppError } from "../../../src/shared/middlewares/error.middleware";

describe('DeleteTransactionService', () => {
  let repositoryMock: any;
  let service: DeleteTransactionService;

  beforeEach(() => {
    repositoryMock = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    service = new DeleteTransactionService(repositoryMock);
  });

  it('should allow ADMIN to delete any transaction', async () => {
    repositoryMock.findById.mockResolvedValue({
      id: '1',
      userId: 'another-user',
    });

    await service.execute('user-1', 'ADMIN', '1');

    expect(repositoryMock.delete).toHaveBeenCalledWith('1');
  });

  it('should allow USER to delete own transaction', async () => {
    repositoryMock.findById.mockResolvedValue({
      id: '1',
      userId: 'user-1',
    });

    await service.execute('user-1', 'USER', '1');

    expect(repositoryMock.delete).toHaveBeenCalledWith('1');
  });

  it('should throw if USER tries to delete another user transaction', async () => {
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