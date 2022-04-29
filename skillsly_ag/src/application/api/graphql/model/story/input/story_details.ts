import { Field, ID, InputType } from '@nestjs/graphql';
import { Id } from '@application/common/type/common_types';

@InputType()
export class StoryDetails {
  @Field(() => ID)
  public owner_id: Id;

  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public media_locator: string;
}
