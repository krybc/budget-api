import { FindOperator, ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
  public from(value: string | null): number {
    if (value === null) {
      return 0;
    }

    return parseFloat(value);
  }

  public to(value: number | FindOperator<any>): string | FindOperator<any> {
    if (typeof value === 'number') {
      return value.toString();
    } else {
      return value;
    }
  }
}
