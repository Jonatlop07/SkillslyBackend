import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class UpdateConversation {
  @Field()
  public conversation_id: string;
  @Field()
  public name: string;
  @Field()
  public is_private: boolean;
  @Field()
  public description: string;
}
