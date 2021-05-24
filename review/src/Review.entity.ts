import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Movie } from './Movie.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Review {
  @Field((type) => ID)
  id: string;

  @Field()
  content: string;

  @Field((type) => String)
  movieId: string;

  @Field((type) => Movie)
  movie?: Movie;
}
