import LoginService from '../../../src/modules/users/services/login.service';
import { AppError } from '../../../src/shared/middlewares/error.middleware';

jest.mock('bcrypt');

describe('LoginService', () => {
  let usersRepositoryMock: any;
  let tokenServiceMock: any;
  let passwordServiceMock: any;
  let loginService: LoginService;

  beforeEach(() => {
    usersRepositoryMock = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      updateRefreshToken: jest.fn(),
    };

    tokenServiceMock = {
      generateToken: jest.fn(),
    };

    passwordServiceMock = {
      encrypt: jest.fn(),
      compare: jest.fn(),
    }

    loginService = new LoginService(
      usersRepositoryMock,
      tokenServiceMock,
      passwordServiceMock
    );
  });

  it('should login a user successfully', async () => {
    usersRepositoryMock.findByEmail.mockResolvedValue({
      id: '123',
      name: 'Pablo',
      email: 'pablo@email.com',
      password: 'hashed_password',
    });

    passwordServiceMock.compare.mockResolvedValue(true);

    tokenServiceMock.generateToken.mockReturnValue({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    usersRepositoryMock.updateRefreshToken.mockResolvedValue(undefined);

    const result = await loginService.execute(
      'pablo@email.com',
      '123456'
    );

    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith('pablo@email.com');
    expect(passwordServiceMock.compare).toHaveBeenCalledWith('123456', 'hashed_password');
    expect(tokenServiceMock.generateToken).toHaveBeenCalledWith('123');
    expect(usersRepositoryMock.updateRefreshToken).toHaveBeenCalledWith('123', 'refresh-token');

    expect(result).toHaveProperty('accessToken');
    expect(result.user.email).toBe('pablo@email.com');
  });

  it('should throw error if email already exists', async () => {
    usersRepositoryMock.findByEmail.mockResolvedValue({
      id: '1',
      email: 'pablo@email.com',
    });

    await expect(
      loginService.execute('pablo@email.com', '123456')
    ).rejects.toBeInstanceOf(AppError);
  });
});