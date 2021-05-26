import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
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
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  content: string;

  @Field((type) => String)
  @Column()
  movieId: string;

  @ManyToOne('movie', 'reviews')
  @JoinColumn({ name: 'movieId' })
  @Field((type) => Movie)
  movie?: Movie;
}
