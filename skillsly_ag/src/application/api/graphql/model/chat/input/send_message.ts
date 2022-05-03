import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class SendMessage {
  @Field()
  public content: string;

  @Field()
  public owner_user_id: string;

  @Field()
  public conversation_id: string;

}
