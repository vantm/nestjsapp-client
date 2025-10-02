import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database/database.module';
import { repositoryProvider } from '@app/database/repository.provider';
import { User } from '@app/user/models/user.model';
import { AuthController } from './controllers/auth.controller';
import { JwtGuard } from './guards/jwt.guard';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    TaskService,
    repositoryProvider(User),
    JwtStrategy,
    JwtGuard,
  ],
})
export class AuthModule {}
