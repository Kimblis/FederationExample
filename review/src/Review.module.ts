import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { MovieResolvers } from './Movie.resolver';
import { Movie } from './Movie.entity';
import { ReviewResolvers } from './Review.resolver';
import { ReviewService } from './Review.service';
import { join } from 'path';
import { ReviewsLoader } from './ReviewsLoader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { MovieReviewsLoader } from './MovieReviewsLoader';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    }),
  ],
  providers: [
    ReviewResolvers,
    ReviewService,
    MovieResolvers,
    ReviewsLoader,
    MovieReviewsLoader,
    { provide: APP_INTERCEPTOR, useClass: DataLoaderInterceptor },
  ],
})
export class ReviewModule {}
