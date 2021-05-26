import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Movie } from './Movie.entity';
import { Review } from './Review.entity';
import { ReviewService } from './Review.service';
import pubsub from './pubsub';
import { Loader } from 'nestjs-graphql-dataloader';
import { ReviewsLoader } from './ReviewsLoader';

@Resolver((of) => Review)
export class ReviewResolvers {
  constructor(private reviewService: ReviewService) {}

  @Query((returns) => [Review])
  getAllReviews() {
    const reviews = this.reviewService.getAllReviews();
    pubsub.publish('REVIEWS_RETRIEVED', reviews);
    return reviews;
  }

  @Query((returns) => [Review])
  getMovieReviews(@Args('id') movieId: string) {
    console.log('yo');
    return this.reviewService.findByMovieId(movieId);
  }

  @Query(() => [Review])
  getReviews(
    @Args({ name: 'ids', type: () => [String] }) ids: string[],
    @Loader(ReviewsLoader)
    reviewsLoader: DataLoader<Review['id'], Review>,
  ) {
    console.log('loader is working');
    return reviewsLoader.loadMany(ids);
  }

  @Mutation(() => Review)
  async createReview(
    @Args('content') content: string,
    @Args('movieId') movieId: string,
  ) {
    return this.reviewService.createReview(content, movieId);
  }

  @ResolveField((of) => Movie)
  movie(@Parent() review: Review): any {
    return { __typename: 'Movie', id: review.movieId };
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string[] }) {
    return this.reviewService.getReviewsById(reference.id);
  }
}
