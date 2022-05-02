import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommentContent {
  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public media_locator: string;
}
