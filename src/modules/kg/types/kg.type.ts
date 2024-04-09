import { SYSTEM_NODE_ID, SYSTEM_RELATION_COMMENT } from 'src/constants/kg';

export interface IQueryPayload {
  labels: string;
  attr: string;
  value: string;
}

export interface IEditRelationPayload {
  [SYSTEM_NODE_ID]: string;
  from: string;
  to: string;
  [SYSTEM_RELATION_COMMENT]: string;
  label: string;
}

export interface IAddNodeItem {
  label: string;
  value: any[];
  immutableAttr: boolean;
  isLabel: boolean;
}

export interface ICreateRelationPayload {
  from: any;
  target: any;
  relation: any;
  comment: any;
}
