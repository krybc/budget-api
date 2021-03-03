import { FindOperator, ValueTransformer } from 'typeorm';
import { DateTime } from 'luxon';

export class DateTimeTransformer implements ValueTransformer {
  public from(value: string): DateTime {
    return DateTime.fromSQL(value);
  }

  public to(value: DateTime | FindOperator<any>): Date | FindOperator<any> {
    if (value instanceof DateTime) {
      return value.toJSDate();
    } else {
      return value;
    }
  }
}
