import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Movie {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;
}
