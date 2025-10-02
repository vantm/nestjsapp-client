import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { LoginDto } from '@app/auth/dto/login.dto';
import { User } from '@app/user/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(login: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: login.username },
    });

    if (!user || !user.enable || user.password !== login.password) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  getJwt(user: User): string {
    const token = sign({}, 'your_jwt_secret', {
      expiresIn: '1h',
      subject: user.username,
      issuer: 'nestjsapp-client',
      algorithm: 'HS256',
    });
    return token;
  }
}
