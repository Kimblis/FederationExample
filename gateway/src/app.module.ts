import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
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
          // { name: 'backend', url: 'http://localhost:1001/graphql' },
        ],
      },
    }),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: DataLoaderInterceptor }],
})
export class AppModule {}
