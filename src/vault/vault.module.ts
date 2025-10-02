import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/database/database.module';
import { repositoryProvider } from '@app/database/repository.provider';
import { KeyValController } from './controllers/key-val.controller';
import { KeyVal } from './models/key-val.model';
import { KeyValService } from './services/key-val.service';

@Module({
  imports: [DatabaseModule],
  controllers: [KeyValController],
  providers: [KeyValService, repositoryProvider(KeyVal)],
  exports: [KeyValService],
})
export class VaultModule {}
