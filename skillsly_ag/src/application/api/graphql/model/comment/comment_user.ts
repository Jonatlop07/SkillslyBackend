import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Defines the information of a comment user' })
export class CommentUser {
  @Field()
  public email: string;

  @Field()
  public name: string;
}
