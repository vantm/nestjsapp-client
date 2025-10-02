import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateKeyValDto } from '../dto/create-key-val.dto';
import { UpdateKeyValDto } from '../dto/update-key-val.dto';
import { KeyVal } from '../models/key-val.model';
import { KeyValService } from '../services/key-val.service';

@Controller('key-val')
export class KeyValController {
  constructor(private readonly keyValService: KeyValService) {}

  @Post()
  async create(@Body() createKeyValDto: CreateKeyValDto): Promise<KeyVal> {
    return this.keyValService.create(createKeyValDto);
  }

  @Get()
  async findAll(): Promise<KeyVal[]> {
    return this.keyValService.findAll();
  }

  @Get(':key')
  async findOne(@Param('key') key: string): Promise<KeyVal> {
    return this.keyValService.findOne(key);
  }

  @Put(':key')
  async update(
    @Param('key') key: string,
    @Body() updateKeyValDto: UpdateKeyValDto,
  ): Promise<KeyVal> {
    return this.keyValService.update(key, updateKeyValDto);
  }

  @Delete(':key')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('key') key: string): Promise<void> {
    return this.keyValService.remove(key);
  }
}
