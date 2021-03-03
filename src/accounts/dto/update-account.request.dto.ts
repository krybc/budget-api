import { IsNumber } from 'class-validator';

export class UpdateAccountRequestDto {
  id: number;
  name: string;

  @IsNumber()
  amount: number;
}
