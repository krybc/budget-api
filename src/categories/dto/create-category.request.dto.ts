import { IsNumber, IsString } from 'class-validator';

export class CreateCategoryRequestDto {
  parentId: number;

  @IsString()
  name: string;

  @IsNumber()
  type: number;

  @IsNumber()
  order: number;
}
