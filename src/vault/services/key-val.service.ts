import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateKeyValDto } from '../dto/create-key-val.dto';
import { UpdateKeyValDto } from '../dto/update-key-val.dto';
import { KeyVal } from '../models/key-val.model';

@Injectable()
export class KeyValService {
  constructor(
    @InjectRepository(KeyVal)
    private readonly keyValRepository: Repository<KeyVal>,
  ) {}

  async create(createKeyValDto: CreateKeyValDto): Promise<KeyVal> {
    const keyVal = this.keyValRepository.create(createKeyValDto);
    return await this.keyValRepository.save(keyVal);
  }

  async findAll(): Promise<KeyVal[]> {
    return await this.keyValRepository.find();
  }

  async findOne(key: string): Promise<KeyVal> {
    const keyVal = await this.keyValRepository.findOne({ where: { key } });
    if (!keyVal) {
      throw new NotFoundException(`KeyVal with key "${key}" not found`);
    }
    return keyVal;
  }

  async update(key: string, updateKeyValDto: UpdateKeyValDto): Promise<KeyVal> {
    const keyVal = await this.findOne(key);
    keyVal.value = updateKeyValDto.value;
    return await this.keyValRepository.save(keyVal);
  }

  async remove(key: string): Promise<void> {
    const keyVal = await this.findOne(key);
    await this.keyValRepository.remove(keyVal);
  }
}
