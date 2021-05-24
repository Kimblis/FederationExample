import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ReviewService } from './Review.service';
import { Movie } from './Movie.entity';
import { Review } from './Review.entity';

@Resolver((of) => Movie)
export class MovieResolvers {
  constructor(private readonly reviewService: ReviewService) {}

  @ResolveField((of) => [Review])
  public reviews(@Parent() movie: Movie): Review[] {
    return this.reviewService.findByMovieId(movie.id);
  }
}
