import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database/database.module';

@Module({
  imports: [DatabaseModule],
})
export class UserModule {}
