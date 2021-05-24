import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { Review } from './Review.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Movie {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field((type) => [Review], { nullable: 'itemsAndList' })
  reviews?: Review[];
}
