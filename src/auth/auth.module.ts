import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TaskService],
})
export class AuthModule {}
