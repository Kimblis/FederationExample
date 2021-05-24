import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLGatewayModule.forRoot({
      server: {
        cors: true,
      },
      gateway: {
        serviceList: [
          { name: 'movies', url: 'http://localhost:3003/graphql' },
          { name: 'reviews', url: 'http://localhost:3001/graphql' },
          { name: 'backend', url: 'http://localhost:1001/graphql' },
        ],
      },
    }),
  ],
})
export class AppModule {}
