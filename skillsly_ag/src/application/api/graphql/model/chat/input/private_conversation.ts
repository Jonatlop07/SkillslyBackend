import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PrivateConversation {
  @Field()
  public creator_user_id: string;

  @Field()
  public member_user_id: string;



}
