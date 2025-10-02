import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyVal } from '../models/key-val.model';

@Injectable()
export class KeyValService {
  constructor(
    @InjectRepository(KeyVal)
    private readonly keyValRepository: Repository<KeyVal>,
  ) {}
}
