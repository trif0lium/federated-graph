import { DynamicModule, Global, Module, Scope } from '@nestjs/common';
import { RequestContext, REQUEST_CONTEXT } from '@testing/request-context';
import { LoggingService } from './logging.service';

export interface LoggingModuleOptions {
  isGlobal: boolean
  requestContext: {
    contextClass: (new () => RequestContext)
  }
}


@Global()
@Module({
  controllers: [],
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggingModule {
  static forRoot(options: LoggingModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: LoggingModule,
      providers: [
        {
          provide: REQUEST_CONTEXT,
          scope: Scope.TRANSIENT,
          useValue: options.requestContext.contextClass
        }
      ]
    }
  }
}
