import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class GetConversations {

  @Field()
  public user_id: string;

}
