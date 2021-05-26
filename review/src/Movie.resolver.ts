import { Loader } from 'nestjs-dataloader';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ReviewService } from './Review.service';
import { Movie } from './Movie.entity';
import { Review } from './Review.entity';
import * as DataLoader from 'dataloader';
import { MovieReviewsLoader } from './MovieReviewsLoader';

@Resolver(Movie)
export class MovieResolvers {
  @ResolveField(() => [Review])
  reviews(
    @Parent() movie: Movie,
    @Loader(MovieReviewsLoader.name)
    reviewsLoader: DataLoader<Movie['id'], Review[]>,
  ) {
    console.log(movie);
    return reviewsLoader.load(movie.id);
  }
}
