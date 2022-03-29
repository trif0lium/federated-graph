import { AsyncLocalStorage } from 'async_hooks'

export abstract class RequestContext {
  logFields: Record<string, any> = {}
  static asyncLocalStorage = new AsyncLocalStorage<RequestContext>();
  static start = <T extends RequestContext>(constructor: new () => T, callback: () => unknown): void => {
    RequestContext.asyncLocalStorage.run(new constructor(), callback)
  }
  static get<T extends RequestContext>(): T {
    return RequestContext.asyncLocalStorage.getStore() as T;
  }
}

export interface RequestContextModuleOptions<T extends RequestContext> {
  contextClass: (new () => T);
  isGlobal: boolean;
}
