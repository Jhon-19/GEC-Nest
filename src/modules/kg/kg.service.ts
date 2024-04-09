import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@nhogs/nestjs-neo4j';
import queryUtils, { executeTransaction } from './utils/cypher.util';
import { buildQuery, recordsToObjects } from './utils/neo4j.util';
import {
  IAddNodeItem,
  ICreateRelationPayload,
  IEditRelationPayload,
  IQueryPayload,
} from './types/kg.type';
import { write } from 'fs';

@Injectable()
export class KgService {
  constructor(private readonly neo4jService: Neo4jService) {}

  //  queryGraph(): Promise<RecordShape> {
  //   const params = { labels: [], attr: '', value: '' };
  //   const result = this.neo4jService.run({
  //     cypher: queryUtils.queryGraph(params),
  //   });
  //   return result.records[0].toObject();
  // }

  async query(params, write = false) {
    const result = await this.neo4jService.run(buildQuery(params), { write });
    return recordsToObjects(result.records);
  }

  async queryInSession(params) {
    const session = this.neo4jService.getSession();
    await session.executeWrite((tx) => executeTransaction(tx, params));
    session.close();
    return true;
  }

  queryLabels(): Promise<any> {
    return this.query(queryUtils.queryLabels());
  }

  queryProperties(): Promise<any> {
    return this.query(queryUtils.queryProperties());
  }

  queryRelations(): Promise<any> {
    return this.query(queryUtils.queryRelations());
  }

  queryGraph(params: IQueryPayload): Promise<any> {
    return this.query(queryUtils.queryGraph(params));
  }

  queryRelatedNodeById(id: string) {
    return this.query(queryUtils.queryRelatedNodeById(id));
  }

  deleteNode(id: string) {
    return this.query(queryUtils.operaDeleteNode(id), true);
  }

  editRelation(params: IEditRelationPayload) {
    return this.queryInSession(queryUtils.operaEditRelation(params));
  }

  deleteEdge(edge: string) {
    return this.query(queryUtils.operaDeleteEdge(edge), true);
  }

  addNode(nodes: IAddNodeItem[]) {
    return this.query(queryUtils.operaAddNode(nodes), true);
  }

  editNode(params: any) {
    return this.queryInSession(
      queryUtils.operaEditNode(params.node, params.attrs),
    );
  }

  queryNodeByIdName(query: string) {
    return this.query(queryUtils.queryNodeByIdName(query));
  }

  createRelation(info: ICreateRelationPayload) {
    return this.query(queryUtils.operaCreateRelation(info), true);
  }
}
