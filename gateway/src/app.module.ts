import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';

import { BuildServiceModule } from './BuildService.module';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        server: {
          cors: {
            exposedHeaders: '*',
          },
          context: ({ req }) => ({ authorization: req.headers.authorization }),
        },
        gateway: {
          serviceList: [
            { name: 'movies', url: 'http://localhost:3003/graphql' },
            { name: 'reviews', url: 'http://localhost:3001/graphql' },
            { name: 'backend', url: 'http://localhost:1001/graphql' },
          ],
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
})
export class AppModule {}
