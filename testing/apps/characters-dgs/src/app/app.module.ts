import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CharacterModule } from '../character/character.module';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestContextModule } from '@testing/request-context';
import { AppRequestContext } from './app.request-context';

@Module({
  imports: [
    RequestContextModule.forRoot({
      contextClass: AppRequestContext,
      isGlobal: true
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
