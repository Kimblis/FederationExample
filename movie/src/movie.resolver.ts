import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Resolver((of) => Movie)
export class MovieResolvers {
  constructor(private movieService: MovieService) {}

  @Query((returns) => Movie)
  getMovie(@Args('id') id: string): Movie {
    return this.movieService.findOneById(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }): Movie {
    return this.movieService.findOneById(reference.id);
  }
}
