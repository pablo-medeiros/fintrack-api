import ListTransactionsService from "../../../src/modules/transactions/services/list.service";

describe('ListTransactionsService', () => {
  let repositoryMock: any;
  let service: ListTransactionsService;

  beforeEach(() => {
    repositoryMock = {
      findManyByUser: jest.fn(),
      countByUser: jest.fn(),
    };

    service = new ListTransactionsService(repositoryMock);
  });

  it('should return paginated transactions', async () => {
    repositoryMock.findManyByUser.mockResolvedValue([{ id: '1' }]);
    repositoryMock.countByUser.mockResolvedValue(1);

    const result = await service.execute('user-1', 1, 10);

    expect(result.meta.total).toBe(1);
    expect(result.data.length).toBe(1);
  });
});