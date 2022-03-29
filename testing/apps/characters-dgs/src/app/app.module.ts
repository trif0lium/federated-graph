import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CharacterModule } from '../character/character.module';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestContextModule } from '@testing/request-context';
import { AppRequestContext } from './app.request-context';
import { NextFunction, Request, Response } from 'express';
import { LoggingModule } from '@testing/logging'

@Module({})
class RequestContextProviderModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply((req: Request, res: Response, next: NextFunction) => {
      const ctx: AppRequestContext = AppRequestContext.get()
      ctx['x-edge-date'] = req.headers['x-edge-date'] as string
      next()
    }).forRoutes('*')
  }
}

@Module({
  imports: [
    RequestContextModule.forRoot({
      isGlobal: true,
      contextClass: AppRequestContext,
    }),
    RequestContextProviderModule,
    LoggingModule.forRoot({
      isGlobal: true,
      requestContext: {
        contextClass: AppRequestContext
      }
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})]
    }),
    CharacterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
