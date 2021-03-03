import { DateTime } from 'luxon';
import { Expose, Transform, Type } from 'class-transformer';

export class TransactionsListFiltersDto {
  @Expose()
  @Type(() => DateTime)
  @Transform(({ value }) => (value ? DateTime.fromISO(value) : null), {
    toClassOnly: true,
  })
  dateFrom: DateTime;

  @Expose()
  @Type(() => DateTime)
  @Transform(({ value }) => (value ? DateTime.fromISO(value) : null), {
    toClassOnly: true,
  })
  dateTo: DateTime;

  @Expose()
  @Transform(({ value }) => (value ? parseInt(value) : null), {
    toClassOnly: true,
  })
  limit: number;
}
