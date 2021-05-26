import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { Movie } from './movie.entity';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ name: 'movie_id' })
  movieId: string;

  @ManyToOne('movie', 'reviews')
  @JoinColumn({ name: 'movie_id' })
  movie?: Promise<Movie>;
}
