import {Id} from '@application/common/type/common_types';
import {Field, ID, ObjectType} from '@nestjs/graphql';

@ObjectType({description: 'Defines the information of a chat message' +
      ''})
export class Message{
  @Field()
  public content: string;
  @Field()
  public path: string;
  @Field()
  public owner_user_id: Id;
  @Field()
  public created_at: string;
  @Field()
  public updated_at: string;
}
