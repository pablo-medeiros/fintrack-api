import { $Enums, Prisma, PrismaClient } from "@prisma/client";

export default class TransactionsRepository {

  constructor(readonly prisma: PrismaClient) {}

  async findManyByUser(userId: string, skip = 0, take = 10) {
    return this.prisma.transaction.findMany({
      where: {
        userId,
      },
      skip,
      take,
      orderBy: {updatedAt: "desc"},
    });
  }

  async countByUser(userId: string) {
    return this.prisma.transaction.count({
      where: {
        userId,
      },
    });
  }

  async findMany(skip = 0, take = 10) {
    return this.prisma.transaction.findMany({
      skip,
      take,
      orderBy: {updatedAt: "desc"},
    });
  }

  async count() {
    return this.prisma.transaction.count();
  }

  async findById(id: string) {
    return this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: {title: string, type: $Enums.TransactionType, category: string, date: Date, userId: string, amount: number}) {
    return this.prisma.transaction.create({
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.transaction.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async update(id: string, data: Prisma.TransactionUpdateInput) {
    return this.prisma.transaction.update({
      where: {
        id,
      },
      data: data
    });
  }
    
  
}