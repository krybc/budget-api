import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../core/repositories/user.repository';
import { Connection } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private userRepository: UserRepository;

  constructor(private connection: Connection, private jwtService: JwtService) {
    this.userRepository = connection.getCustomRepository(UserRepository);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      email: dto.email,
    });

    const payload = { username: dto.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ email: username });
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
