import RefreshTokenService from "../../../src/modules/users/services/refresh-token.service";
import { AppError } from "../../../src/shared/middlewares/error.middleware";

describe('RefreshTokenService', () => {
  let usersRepository: any;
  let tokenService: any;
  let service: RefreshTokenService;

  const userId = 'user-123';
  const validRefreshToken = 'valid-refresh-token';

  beforeEach(() => {
    usersRepository = {
      findById: jest.fn(),
      updateRefreshToken: jest.fn()
    };

    tokenService = {
      verifyRefreshToken: jest.fn(),
      generateToken: jest.fn()
    };

    service = new RefreshTokenService(usersRepository, tokenService);
  });

  it('should generate new tokens with valid refresh token', async () => {
    tokenService.verifyRefreshToken.mockReturnValue({ userId });

    usersRepository.findById.mockResolvedValue({
      id: userId,
      refreshToken: validRefreshToken
    });

    tokenService.generateToken.mockReturnValue({
      accessToken: 'new-access',
      refreshToken: 'new-refresh'
    });

    const result = await service.execute(validRefreshToken);

    expect(result).toEqual({
      accessToken: 'new-access',
      refreshToken: 'new-refresh'
    });

    expect(usersRepository.updateRefreshToken)
      .toHaveBeenCalledWith(userId, 'new-refresh');
  });

  it('should throw error if refresh token is invalid', async () => {
    tokenService.verifyRefreshToken.mockImplementation(() => {
      throw new AppError('Invalid refresh token', 401);
    });

    await expect(
      service.execute('invalid-token')
    ).rejects.toThrow(AppError);
  });

  it('should throw error if user does not exist', async () => {
    tokenService.verifyRefreshToken.mockReturnValue({ userId });

    usersRepository.findById.mockResolvedValue(null);

    await expect(
      service.execute(validRefreshToken)
    ).rejects.toThrow(AppError);
  });

  it('should throw error if refresh token does not match stored token', async () => {
    tokenService.verifyRefreshToken.mockReturnValue({ userId });

    usersRepository.findById.mockResolvedValue({
      id: userId,
      refreshToken: 'different-token'
    });

    await expect(
      service.execute(validRefreshToken)
    ).rejects.toThrow(AppError);
  });
});