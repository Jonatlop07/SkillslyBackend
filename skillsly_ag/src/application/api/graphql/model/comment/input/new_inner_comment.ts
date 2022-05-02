import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class NewInnerComment {
  @Field(() => ID)
  public owner_id: string;

  @Field({ nullable: true })
  public description: string;

  @Field({ nullable: true })
  public media_locator: string;
}
