export interface ResourceModuleOptions {
  inject: any[];
  useFactory: (...args: any[]) => string;
}
