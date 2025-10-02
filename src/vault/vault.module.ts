import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { repositoryProvider } from 'src/database/repository.provider';
import { KeyValController } from './controllers/key-val.controller';
import { KeyVal } from './models/key-val.model';
import { KeyValService } from './services/key-val.service';

@Module({
  imports: [DatabaseModule],
  controllers: [KeyValController],
  providers: [KeyValService, repositoryProvider(KeyVal)],
})
export class VaultModule {}
