import { AppError } from "../../../shared/middlewares/error.middleware";
import TokenService from "../../../shared/services/token.service";
import UsersRepository from "../repositories/users.repository";

export default class RefreshTokenService {

  constructor(readonly userRepository: UsersRepository, readonly tokenService: TokenService) {}

  async execute(refreshToken: string) {
    const {userId} = this.tokenService.verifyRefreshToken(refreshToken);
    const user = await this.userRepository.findById(userId); 
    if (!user||user.refreshToken !== refreshToken) {
      throw new AppError("Invalid refresh token", 401);
    }
    const token = this.tokenService.generateToken(user.id, user.role);
    await this.userRepository.updateRefreshToken(user.id, token.refreshToken);
    return {
      ...token
    };
  }
}