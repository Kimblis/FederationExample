import { Injectable, Scope } from '@nestjs/common';
import { OrderedNestDataLoader } from 'nestjs-graphql-dataloader';
import { Review } from './Review.entity';
import { ReviewService } from './Review.service';

@Injectable({ scope: Scope.REQUEST })
export class ReviewsLoader extends OrderedNestDataLoader<Review['id'], Review> {
  constructor(private readonly reviewsService: ReviewService) {
    super();
  }

  protected getOptions = () => ({
    query: (keys: Array<Review['id']>) =>
      this.reviewsService.getReviewsById(keys) || [],
  });
}
