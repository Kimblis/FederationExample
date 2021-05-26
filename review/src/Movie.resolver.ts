import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Loader } from 'nestjs-dataloader';

import { Movie } from './Movie.entity';
import { Review } from './Review.entity';
import { MovieReviewsLoader } from './MovieReviewsLoader';

@Resolver(Movie)
export class MovieResolvers {
  @ResolveField(() => [Review])
  reviews(
    @Parent() movie: Movie,
    @Loader(MovieReviewsLoader.name)
    reviewsLoader: DataLoader<Movie['id'], Review[]>,
  ) {
    return reviewsLoader.load(movie.id);
  }
}
