import { Injectable } from '@nestjs/common';

import { Movie } from './movie.model';

@Injectable()
export class MovieService {
  private movies: Movie[] = [{ id: '555bc', title: 'Zero' }];

  findOneById(movieId: string): Movie {
    return this.movies.find(({ id }) => id === movieId);
  }
}
