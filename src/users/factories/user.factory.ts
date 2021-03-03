import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../core/entities/user';
import * as bcrypt from 'bcrypt';

export class UserFactory {
  static async fromCreateDto(dto: CreateUserDto): Promise<User> {
    const user = Object.assign(new User(), dto);
    user.password = await bcrypt.hash(user.password, 10);

    return user;
  }

  static async fromUpdateDto(dto: CreateUserDto): Promise<User> {
    const user = Object.assign(new User(), dto);
    user.password = await bcrypt.hash(user.password, 10);

    return user;
  }
}
