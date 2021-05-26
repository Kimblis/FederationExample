import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

import { MovieResolvers } from './Movie.resolver';
import { Movie } from './Movie.entity';
import { ReviewResolvers } from './Review.resolver';
import { ReviewService } from './Review.service';
import { MovieReviewsLoader } from './MovieReviewsLoader';
import typeOrmOptions from './typeorm';
import { Review } from './Review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    TypeOrmModule.forFeature([Movie, Review]),
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [Movie],
      },
      fieldResolverEnhancers: ['interceptors'],
    }),
  ],
  providers: [
    ReviewResolvers,
    ReviewService,
    MovieResolvers,
    MovieReviewsLoader,
    { provide: APP_INTERCEPTOR, useClass: DataLoaderInterceptor },
  ],
})
export class ReviewModule {}
