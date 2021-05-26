import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Review } from './Review.entity';

@Entity('movie')
@ObjectType()
@Directive('@key(fields: "id")')
export class Movie {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @OneToMany('review', 'movie')
  reviews?: Review[];
}
