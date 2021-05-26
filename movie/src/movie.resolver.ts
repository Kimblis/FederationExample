import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import pubsub from './pubsub';

@Resolver((of) => Movie)
export class MovieResolvers {
  constructor(private movieService: MovieService) {}

  @Query(() => Movie)
  async getMovie(@Args('id') id: string) {
    const movie = await this.movieService.findOneById(id);
    pubsub.publish('MOVIE_RETRIEVED', movie);
    return movie;
  }

  @Query(() => [Movie])
  async getAllMovies() {
    return this.movieService.findAllMovies();
  }

  @Mutation(() => Movie)
  async createMovie(@Args('title') title: string) {
    return this.movieService.createMovie(title);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.movieService.findOneById(reference.id);
  }
}
