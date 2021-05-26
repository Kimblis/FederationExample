// @ts-nocheck
import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { NestDataLoader } from 'nestjs-dataloader';
import { Review } from './Review.entity';
import { ReviewService } from './Review.service';
import { map } from 'ramda';

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
      const kebab = map((key) => groupedByMovieId[key] || [], keys);
      return kebab;
    });
  }
}
