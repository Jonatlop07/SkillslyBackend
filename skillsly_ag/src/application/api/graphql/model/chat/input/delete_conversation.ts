import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class DeleteConversation {
  @Field()
  public conversation_id: string;

  @Field()
  public user_id: string;

}
