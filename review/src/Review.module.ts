import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { MovieResolvers } from './Movie.resolver';
import { Movie } from './Movie.entity';
import { ReviewResolvers } from './Review.resolver';
import { ReviewService } from './Review.service';
import { join } from 'path';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        orphanedTypes: [Movie],
      },
    }),
  ],
  providers: [ReviewResolvers, ReviewService, MovieResolvers],
})
export class ReviewModule {}
