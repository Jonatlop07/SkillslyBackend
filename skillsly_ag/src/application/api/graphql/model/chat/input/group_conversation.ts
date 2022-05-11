import {Field, InputType} from '@nestjs/graphql';
import {InputMember} from '@application/api/graphql/model/chat/input/input_member';

@InputType()
export class GroupConversation {
  @Field()
  public request_user_id: string;

  @Field()
  public name: string;

  @Field()
  public description: string;

  @Field(() => [InputMember])
  public members: Array<InputMember>;

  @Field()
  public is_private: boolean;
}


