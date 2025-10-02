import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { LoginDto } from '@app/auth/dto/login.dto';
import { UserAttributesDto } from '@app/auth/dto/user-attributes.dto';
import { AuthService } from '@app/auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() login: LoginDto) {
    const user = await this.authService.login(login);

    const token = this.authService.getJwt(user);

    return { access_token: token };
  }

  @UseGuards()
  @Get('profile')
  getProfile(@Request() req: Request & { user: UserAttributesDto }) {
    return req.user;
  }
}
