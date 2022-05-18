import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentContentUpdate {
  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public media_locator: string;

  @Field({ nullable: true })
  public media_type: string;
}
