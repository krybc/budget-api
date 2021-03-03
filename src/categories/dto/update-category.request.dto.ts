import { IsNumber, IsString } from 'class-validator';

export class UpdateCategoryRequestDto {
  id: number;
  parentId: number;

  @IsString()
  name: string;

  @IsNumber()
  type: number;

  @IsNumber()
  order: number;
}
