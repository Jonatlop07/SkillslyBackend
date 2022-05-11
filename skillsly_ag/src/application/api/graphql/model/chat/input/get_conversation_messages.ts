import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class GetConversationMessages {
  @Field()
  public conversation_id: string;
}
