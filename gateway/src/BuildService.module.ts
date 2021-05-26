import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE } from '@nestjs/graphql';

import { AuthenticationDataSource } from './AuthenticationDataSource';

@Module({
  providers: [
    {
      provide: AuthenticationDataSource,
      useValue: AuthenticationDataSource,
    },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory: (AuthenticationDataSource) => {
        return ({ url }) => new AuthenticationDataSource({ url });
      },
      inject: [AuthenticationDataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
export class BuildServiceModule {}
