import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Review } from './Review.entity';

@Entity('movie')
@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Movie {
  @Field((type) => ID)
  @Directive('@external')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany('review', 'movie')
  @Field((type) => [Review], { nullable: 'itemsAndList' })
  reviews?: Review[];
}
