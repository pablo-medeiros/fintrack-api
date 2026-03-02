import { $Enums } from "@prisma/client";

export default interface CreateTransactionDTO {
  readonly title: string;
  readonly type: $Enums.TransactionType;
  readonly category: string;
  readonly date: Date;
  readonly amount: number
}