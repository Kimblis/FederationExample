import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Movie } from './Movie.entity';
import { Review } from './Review.entity';
import { ReviewService } from './Review.service';

@Resolver((of) => Review)
export class ReviewResolvers {
  constructor(private reviewService: ReviewService) {}

  @Query((returns) => [Review])
  getAllReviews(): Review[] {
    return this.reviewService.getAllReviews();
  }

  @Query((returns) => [Review])
  getMovieReviews(@Args('id') movieId: string): Review[] {
    return this.reviewService.findByMovieId(movieId);
  }

  @ResolveField((of) => Movie)
  movie(@Parent() review: Review): any {
    return { __typename: 'Movie', id: review.movieId };
  }
}
