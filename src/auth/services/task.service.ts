import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Headers, default as nodeFetch } from 'node-fetch';
import { KeyValService } from '@app/vault/services/key-val.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly keyValService: KeyValService) {}

  @Cron('*/30 * * * * *')
  async handleSync() {
    this.logger.log('Syncing data...');

    const syncUrl = await this.keyValService.findOne('sync.url');

    if (!syncUrl) {
      throw new BadRequestException('Sync URL not found');
    }

    const apiKey = await this.keyValService.findOne('sync.apiKey');

    if (!apiKey) {
      throw new BadRequestException('API key not found');
    }

    this.logger.log(`Syncing data to ${syncUrl.value}...`);

    const headers = new Headers();

    headers.append('x-api-key', apiKey.value);

    const res = await nodeFetch(syncUrl.value + '/info', {
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      throw new BadRequestException(
        `Failed to fetch data from ${syncUrl.value}: ${res.status} ${res.statusText}`,
      );
    }

    const data = (await res.json()) as {
      id: string;
      name: string;
      topicName: string;
    };

    this.logger.log(`Fetched data: ${JSON.stringify(data)}`);

    await this.keyValService.create({
      key: 'sync.lastSync',
      value: new Date().toISOString(),
    });

    await this.keyValService.create({
      key: 'sync.topicName',
      value: data.topicName,
    });

    this.logger.log('Data synced successfully');
  }
}
