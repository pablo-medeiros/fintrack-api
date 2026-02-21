import { AppError } from "../../../shared/middlewares/error.middleware";
import TokenService from "../../../shared/services/token.service";
import UsersRepository from "../repositories/users.repository";
import PasswordService from "./password.service";

export default class RegisterService {

  constructor(readonly usersRepository: UsersRepository, readonly tokenService: TokenService, readonly passwordService: PasswordService) {}

  async execute(name: string, email: string, password: string) {
    if(await this.usersRepository.findByEmail(email)) {
      throw new AppError("Email already in use", 409);
    }
    const hashedPassword = await this.passwordService.encrypt(password);
    const user = await this.usersRepository.create(name, email, hashedPassword);
    const {accessToken, refreshToken} = this.tokenService.generateToken(user.id);
    await this.usersRepository.updateRefreshToken(user.id, refreshToken);
    return {user: {id: user.id, name: user.name, email: user.email}, accessToken, refreshToken};
  }
}