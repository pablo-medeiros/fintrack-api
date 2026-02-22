import { $Enums, Prisma, PrismaClient } from "@prisma/client";

export default class TransactionsRepository {

  constructor(readonly prisma: PrismaClient) {}

  async listFromType(type: $Enums.TransactionType, userId?: string) {
    return this.prisma.transaction.findMany({
      where: {
        type,
        userId: userId ? userId : undefined,
      },
    });
  }

  async listFromDateRange(startDate: Date, endDate: Date, userId?: string) {
    return this.prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        userId: userId ? userId : undefined,
      },
    });
  }

  async listFromUser(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        userId,
      },
    });
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

  async update(id: string, data: Prisma.TransactionGetPayload<{ select: { title: true, type: true, category: true, date: true, amount: true } }>) {
    return this.prisma.transaction.update({
      where: {
        id,
      },
      data: data
    });
  }
    
  
}