import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class AddMembersConversation {
  @Field(()=> [String])
  public users_ids: Array<string>;

  @Field()
  public conversation_id: string;

}
