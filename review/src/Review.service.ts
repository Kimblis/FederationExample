import { Injectable } from '@nestjs/common';

import { Review } from './Review.entity';

@Injectable()
export class ReviewService {
  private reviews: Review[] = [
    { id: '555ba', content: 'pajibat', movieId: '555bc' },
    { id: '555bb', content: 'jibaaaaat', movieId: '555bc' },
  ];

  findByMovieId(movieId: string): Review[] {
    return this.reviews.filter((review) => review.movieId === movieId);
  }
  getAllReviews(): Review[] {
    return this.reviews;
  }
}
