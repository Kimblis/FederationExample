import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  findOneById(movieId: string) {
    return this.movieRepository.findOne({
      where: { id: movieId },
      relations: ['reviews'],
    });
  }
  findAllMovies() {
    return this.movieRepository.find();
  }

  createMovie(title: string) {
    return this.movieRepository.save({ title });
  }
}
