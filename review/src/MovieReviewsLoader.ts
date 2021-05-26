import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { map } from 'ramda';

import { Review } from './Review.entity';
import { ReviewService } from './Review.service';

@Injectable({ scope: Scope.REQUEST })
export class MovieReviewsLoader {
  constructor(private readonly reviewsService: ReviewService) {}

  generateDataLoader(): DataLoader<string, Review[]> {
    return new DataLoader<string, Review[]>(async (keys) => {
      const reviews = await this.reviewsService.findByMovieIds(
        keys as string[],
      );

      const groupedByMovieId: { [movieId: string]: Review[] } = {};

      for (const review of reviews) {
        groupedByMovieId[review.movieId] = groupedByMovieId[review.movieId]
          ? [...groupedByMovieId[review.movieId], review]
          : [review];
      }

      return map((key) => groupedByMovieId[key] || [], keys);
    });
  }
}
