import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { IntrospectAndCompose } from '@apollo/gateway'
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';

function supergraphSdl(): IntrospectAndCompose {
  return new IntrospectAndCompose({
    subgraphs: [
      { name: 'characters-dgs', url: 'http://localhost:4001/graphql' },
      { name: 'constellations-dgs', url: 'http://localhost:4002/graphql' },
    ]
  })
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        cors: true
      },
      gateway: {
        supergraphSdl: supergraphSdl()
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
