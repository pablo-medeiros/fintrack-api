import { AppError } from "../../../shared/middlewares/error.middleware";
import TokenService from "../../../shared/services/token.service";
import UsersRepository from "../repositories/users.repository";
import bcrypt from "bcrypt";

export default class RegisterService {

  constructor(readonly usersRepository: UsersRepository, readonly tokenService: TokenService) {}

  async execute(name: string, email: string, password: string) {
    if(await this.usersRepository.findByEmail(email)) {
      throw new AppError("Email already in use", 409);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersRepository.create(name, email, hashedPassword);
    const {accessToken, refreshToken} = this.tokenService.generateToken(user.id);
    await this.usersRepository.updateRefreshToken(user.id, refreshToken);
    return {user: {id: user.id, name: user.name, email: user.email}, accessToken, refreshToken};
  }
}