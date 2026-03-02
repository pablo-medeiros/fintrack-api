import UsersRepository from "../repositories/users.repository";

export default class ListService {

  constructor(readonly usersRepository: UsersRepository) {}

  async execute(page: number, limit: number) {
    const skip = (page-1)*limit;
    const data = await this.usersRepository.findMany(skip, limit);
    const total = await this.usersRepository.count();
    return {
      data,
      meta: {
        page,
        limit,
        total
      }
    }
  }
}