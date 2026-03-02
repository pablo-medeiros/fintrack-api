import RegisterService from '../../../src/modules/users/services/register.service';
import { AppError } from '../../../src/shared/middlewares/error.middleware';
import bcrypt, { compare } from 'bcrypt';

jest.mock('bcrypt');

describe('RegisterService', () => {
  let usersRepositoryMock: any;
  let tokenServiceMock: any;
  let passwordServiceMock: any;
  let registerService: RegisterService;

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

    registerService = new RegisterService(
      usersRepositoryMock,
      tokenServiceMock,
      passwordServiceMock
    );
  }); 
 
  it('should create a new user successfully', async () => {
    usersRepositoryMock.findByEmail.mockResolvedValue(null);

    passwordServiceMock.encrypt.mockResolvedValue('hashed_password');

    usersRepositoryMock.create.mockResolvedValue({
      id: '123',
      name: 'Pablo',
      email: 'pablo@email.com',
      role: 'USER',
    });

    tokenServiceMock.generateToken.mockReturnValue({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    }); 

    usersRepositoryMock.updateRefreshToken.mockResolvedValue(undefined);

    const result = await registerService.execute(
      'Pablo',
      'pablo@email.com',
      '123456'
    );

    expect(usersRepositoryMock.findByEmail).toHaveBeenCalledWith('pablo@email.com');
    expect(passwordServiceMock.encrypt).toHaveBeenCalledWith('123456');
    expect(usersRepositoryMock.create).toHaveBeenCalled();
    expect(tokenServiceMock.generateToken).toHaveBeenCalledWith('123', 'USER');
    expect(usersRepositoryMock.updateRefreshToken).toHaveBeenCalledWith('123', 'refresh-token');

    expect(result).toHaveProperty('accessToken');
    expect(result.user.email).toBe('pablo@email.com');
  });

  it('should throw error if email already exists', async () => {
    usersRepositoryMock.findByEmail.mockResolvedValue({
      id: '1',
      email: 'pablo@email.com',
      role: 'USER'
    });

    await expect(
      registerService.execute('Pablo', 'pablo@email.com', '123456')
    ).rejects.toBeInstanceOf(AppError);
  });
});