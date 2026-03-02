import { $Enums } from "@prisma/client";

export default interface UpdateTransactionDTO {
  readonly title?: string;
  readonly type?: $Enums.TransactionType;
  readonly category?: string;
  readonly date?: Date,
  readonly amount?: number
}