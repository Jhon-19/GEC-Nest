export interface IBaseResponse<T = any> {
  msg: string;
  code: number;
  data?: T;
}
