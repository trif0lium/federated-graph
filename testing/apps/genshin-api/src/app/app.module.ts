import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway'
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

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
        cors: true,
        playground: false,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
      },
      gateway: {
        supergraphSdl: supergraphSdl(),
        buildService({ url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request }) {
              request.http.headers.set('x-edge-date', new Date().toISOString())
            }
          })
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
