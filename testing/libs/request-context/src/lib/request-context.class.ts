import { AsyncLocalStorage } from 'async_hooks'

export abstract class RequestContext {
  static asyncLocalStorage = new AsyncLocalStorage<RequestContext>();
  static start = <T extends RequestContext>(constructor: new () => T): void => {
    RequestContext.asyncLocalStorage.enterWith(new constructor())
  }
  static get<T extends RequestContext>(): T {
    return RequestContext.asyncLocalStorage.getStore() as T;
  }
}

export interface RequestContextModuleOptions<T extends RequestContext> {
  contextClass: (new () => T);
  isGlobal: boolean;
}
