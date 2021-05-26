import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Movie } from './Movie.entity';

@Entity('review')
@ObjectType()
@Directive('@key(fields: "id")')
export class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  content: string;

  @Field(() => String)
  @Column({ name: 'movie_id' })
  movieId: string;

  @ManyToOne('movie', 'reviews')
  @JoinColumn({ name: 'movie_id' })
  @Field(() => Movie)
  movie?: Promise<Movie>;
}
