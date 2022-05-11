import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Id} from '@application/common/type/common_types';
import {Message} from '@application/api/graphql/model/chat/message';
import {Member} from '@application/api/graphql/model/chat/member';

@ObjectType({description: 'Defines the information of a chat'})
export class Conversation {
  @Field(() => ID)
  public conversation_id: Id;

  @Field()
  public creator_user_id: Id;

  @Field()
  public name: string;

  @Field()
  public description: string;

  @Field( ()=> [Member])
  public members: Array<Member>;

  @Field(()=> [Message], {nullable: true})
  public messages: Array<Message>;

  @Field()
  public created_at: string;

  @Field({nullable: true})
  public updated_at: string;

  @Field()
  public is_private: boolean;
}
