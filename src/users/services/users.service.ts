import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserFactory } from '../factories/user.factory';
import { UserRepository } from '../../core/repositories/user.repository';
import { Connection } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  private userRepository: UserRepository;

  constructor(private connection: Connection) {
    this.userRepository = connection.getCustomRepository(UserRepository);
  }

  async create(dto: CreateUserDto) {
    const user = await UserFactory.fromCreateDto(dto);
    return this.userRepository.save(user);
  }

  async update(dto: UpdateUserDto) {
    const user = await UserFactory.fromUpdateDto(dto);
    return this.userRepository.save(user);
  }
}
