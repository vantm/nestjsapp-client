import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { GuestModule } from './guest/guest.module';
import { SyncModule } from './sync/sync.module';
import { UserModule } from './user/user.module';
import { VaultModule } from './vault/vault.module';
import { VoyageModule } from './voyage/voyage.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    VaultModule,
    SyncModule,
    UserModule,
    VoyageModule,
    GuestModule,
  ],
  providers: [AppService],
})
export class AppModule {}
