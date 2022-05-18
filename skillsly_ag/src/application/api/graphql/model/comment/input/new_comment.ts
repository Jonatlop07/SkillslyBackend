import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class NewComment {
  @Field(() => ID)
  public owner_id: string;

  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public media_locator: string;

  @Field({ nullable: true })
  public media_type: string;
}
