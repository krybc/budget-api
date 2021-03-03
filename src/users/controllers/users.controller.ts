import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../services/users.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('users')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
