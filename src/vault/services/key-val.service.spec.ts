import { Test, TestingModule } from '@nestjs/testing';
import { KeyValService } from './key-val.service';

describe('KeyValService', () => {
  let service: KeyValService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyValService],
    }).compile();

    service = module.get<KeyValService>(KeyValService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
