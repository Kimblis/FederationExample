import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { Movie } from './Movie.entity';
import { Review } from './Review.entity';
import { ReviewService } from './Review.service';
import pubsub from './pubsub';

@Resolver(() => Review)
export class ReviewResolvers {
  constructor(private reviewService: ReviewService) {}

  @Query(() => [Review])
  getAllReviews() {
    const reviews = this.reviewService.getAllReviews();
    pubsub.publish('REVIEWS_RETRIEVED', reviews);
    return reviews;
  }

  @Query(() => [Review])
  getMovieReviews(@Args('id') movieId: string) {
    return this.reviewService.findByMovieId(movieId);
  }

  @Query(() => [Review])
  getReviews(@Args({ name: 'ids', type: () => [String] }) ids: string[]) {
    return this.reviewService.getReviewsById(ids);
  }

  @Mutation(() => Review)
  async createReview(
    @Args('content') content: string,
    @Args('movieId') movieId: string,
  ) {
    return this.reviewService.createReview(content, movieId);
  }

  @ResolveField(() => Movie)
  movie(@Parent() review: Review): any {
    return { __typename: 'Movie', id: review.movieId };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string[] }) {
    return this.reviewService.getReviewsById(reference.id);
  }
}
