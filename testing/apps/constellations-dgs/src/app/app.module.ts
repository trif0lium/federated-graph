import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CharacterModule } from '../character/character.module';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Character } from '../entities/character.entity';

@Module({
  imports: [

    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
      buildSchemaOptions: {
        orphanedTypes: [Character]
      }
    }),
    CharacterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
