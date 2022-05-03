import {Field, ID, ObjectType} from '@nestjs/graphql';
import {Id} from '@application/common/type/common_types';

@ObjectType({description: 'Defines the information of a chat member'})
export class Member{
  @Field(() => ID)
  public user_id: Id;

  @Field()
  public is_active: boolean;

  @Field()
  public is_admin: boolean;

  @Field()
  public joined_at: string;

}
