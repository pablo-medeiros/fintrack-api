import { AppError } from "../../../shared/middlewares/error.middleware";
import TokenService from "../../../shared/services/token.service";
import UsersRepository from "../repositories/users.repository";
import PasswordService from "./password.service";

export default class LoginService {

  constructor(readonly userRepository: UsersRepository, readonly tokenService: TokenService, readonly passwordService: PasswordService) {}

  async execute(email: string, password: string) {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new AppError("Email or password incorrect", 401);
      }
      const isPasswordValid = await this.passwordService.compare(password, user.password);
      if (!isPasswordValid) {
        throw new AppError("Email or password incorrect", 401);
      }
      const token = this.tokenService.generateToken(user.id);
      await this.userRepository.updateRefreshToken(user.id, token.refreshToken);
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        ...token
      };
  }
}