import { DateTime } from 'luxon';
import { Expose, Transform, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateTransactionRequestDto {
  @IsNumber()
  categoryId: number;

  @IsNumber()
  accountId: number;

  @IsNumber()
  contractorId: number;

  @Expose()
  @Type(() => DateTime)
  @Transform(({ value }) => DateTime.fromISO(value), { toClassOnly: true })
  date: DateTime;

  @IsNumber()
  @Expose()
  income: number;

  @IsNumber()
  @Expose()
  expense: number;

  @Expose()
  description: string;
}
