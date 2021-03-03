import { IsNumber } from 'class-validator';

export class CreateAccountRequestDto {
  name: string;

  @IsNumber()
  amount: number;
}
