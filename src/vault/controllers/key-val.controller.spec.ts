import { Test, TestingModule } from '@nestjs/testing';
import { KeyValController } from './key-val.controller';

describe('KeyValController', () => {
  let controller: KeyValController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KeyValController],
    }).compile();

    controller = module.get<KeyValController>(KeyValController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
