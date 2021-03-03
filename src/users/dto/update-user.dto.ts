import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  id: number;

  @IsEmail()
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
