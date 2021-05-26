import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { join } from 'path';

import { Movie } from './movie.entity';
import { MovieResolvers } from './movie.resolver';
import { MovieService } from './movie.service';
import typeOrmOptions from './typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    TypeOrmModule.forFeature([Movie]),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    MovieResolvers,
    MovieService,
    { provide: APP_INTERCEPTOR, useClass: DataLoaderInterceptor },
  ],
})
export class MovieModule {}
