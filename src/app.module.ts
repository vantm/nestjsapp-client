import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { VaultModule } from './vault/vault.module';

@Module({
  imports: [AuthModule, DatabaseModule, VaultModule],
  providers: [AppService],
})
export class AppModule {}
