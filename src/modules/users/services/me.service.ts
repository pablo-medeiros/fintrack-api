import UsersRepository from "../repositories/users.repository";

export default class MeService {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);
    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
  }
}