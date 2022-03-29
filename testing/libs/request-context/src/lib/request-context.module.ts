import { DynamicModule, MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { RequestContext, RequestContextModuleOptions } from './request-context.class';
import { REQUEST_CONTEXT, REQUEST_CONTEXT_MODULE_OPTIONS } from './request-context.constant';
import { RequestContextMiddleware } from './request-context.middleware';

@Module({
  controllers: [],
  providers: [RequestContextMiddleware],
  exports: [RequestContextMiddleware],
})
export class RequestContextModule implements NestModule {
  static forRoot<T extends RequestContext>(options: RequestContextModuleOptions<T>): DynamicModule {
    return {
      global: options.isGlobal,
      module: RequestContextModule,
      providers: [
        {
          provide: REQUEST_CONTEXT_MODULE_OPTIONS,
          useValue: options
        },
        {
          provide: REQUEST_CONTEXT,
          scope: Scope.TRANSIENT,
          useValue: options.contextClass
        }
      ]
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*')
  }
}
