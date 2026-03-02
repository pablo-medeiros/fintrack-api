import { PrismaClient } from "@prisma/client";

export default class UsersRepository {

  constructor(readonly prisma: PrismaClient) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findMany(skip = 0, take = 10) {
    return this.prisma.user.findMany({
      skip,
      take,
      orderBy: {createdAt: "desc"},
    });
  }

  async count() {
    return this.prisma.user.count();
  }

  async create(name: string, email: string, password: string) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password,
        role: "USER"
      },
    });
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        refreshToken,
      },
    });
  }
  
}