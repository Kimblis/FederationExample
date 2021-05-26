import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Review } from './Review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  findByMovieId(movieId: string) {
    return this.reviewRepository.find({ movieId });
  }
  findByMovieIds(movieIds: string[]) {
    return this.reviewRepository.find({ movieId: In(movieIds) });
  }
  getAllReviews() {
    return this.reviewRepository.find();
  }
  getReviewsById(reviewsIds: string[]) {
    return this.reviewRepository.find({ id: In(reviewsIds) });
  }
  createReview(content: string, movieId: string) {
    return this.reviewRepository.save({ content, movieId });
  }
}
