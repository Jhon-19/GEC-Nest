import { Controller, Get } from '@nestjs/common';
import { KgService } from './kg.service';
import { RecordShape } from 'neo4j-driver';

@Controller('kg')
export class KgController {
  constructor(private readonly kgService: KgService) {}

  @Get()
  async queryGraph(): Promise<RecordShape> {
    return await this.kgService.queryGraph();
  }
}
