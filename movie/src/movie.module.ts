import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { MovieResolvers } from './movie.resolver';
import { MovieService } from './movie.service';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [MovieResolvers, MovieService],
})
export class MovieModule {}
