import { Body, Controller, Get, Post } from '@nestjs/common';
import { KgService } from './kg.service';
import { QueryResult, RecordShape } from 'neo4j-driver';
import {
  IAddNodeItem,
  ICreateRelationPayload,
  IEditRelationPayload,
  IQueryPayload,
} from './types/kg.type';

@Controller('kg')
export class KgController {
  constructor(private readonly kgService: KgService) {}

  // @Get()
  // queryGraph(): Promise<RecordShape> {
  //   return this.kgService.queryGraph();
  // }

  @Get('query-labels')
  queryLabels() {
    return this.kgService.queryLabels();
  }

  @Get('query-properties')
  queryProperties() {
    return this.kgService.queryProperties();
  }

  @Get('query-relations')
  queryRelations() {
    return this.kgService.queryRelations();
  }

  @Post('query-graph')
  queryGraph(@Body() params: IQueryPayload) {
    return this.kgService.queryGraph(params);
  }

  @Post('query-related-node-by-id')
  queryRelatedNodeById(@Body('id') id: string) {
    return this.kgService.queryRelatedNodeById(id);
  }

  @Post('delete-node')
  deleteNode(@Body('id') id: string) {
    return this.kgService.deleteNode(id);
  }

  @Post('edit-relation')
  editRelation(@Body() params: IEditRelationPayload) {
    return this.kgService.editRelation(params);
  }

  @Post('delete-edge')
  deleteEdge(@Body('edge') edge: string) {
    return this.kgService.deleteEdge(edge);
  }

  @Post('add-node')
  addNode(@Body('nodes') nodes: IAddNodeItem[]) {
    return this.kgService.addNode(nodes);
  }

  @Post('edit-node')
  editNode(@Body() params: any) {
    return this.kgService.editNode(params);
  }

  @Post('query-node-by-id-name')
  queryNodeByIdName(@Body('query') query: string) {
    return this.kgService.queryNodeByIdName(query);
  }

  @Post('create-relation')
  createRelation(@Body() info: ICreateRelationPayload) {
    return this.kgService.createRelation(info);
  }
}
