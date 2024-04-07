import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@nhogs/nestjs-neo4j';
import queryUtils from './utils/cypher.util';
import { RecordShape } from 'neo4j-driver';

@Injectable()
export class KgService {
  constructor(private readonly neo4jService: Neo4jService) {}

  async queryGraph(): Promise<RecordShape> {
    const params = { labels: [], attr: '', value: '' };
    const result = await this.neo4jService.run({
      cypher: queryUtils.queryGraph(params),
    });
    return result.records[0].toObject();
  }
}
