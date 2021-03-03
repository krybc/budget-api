import { DateTime } from 'luxon';
import { Expose, Transform } from 'class-transformer';

export class TransactionResponseDto {
  id: number;
  accountId: number;
  categoryId: number;
  contractorId: number;

  @Expose()
  @Transform(({ value }) => value.toISODate(), {
    toPlainOnly: true,
  })
  date: DateTime;

  @Expose()
  income: number;

  @Expose()
  expense: number;

  description: string;
}
