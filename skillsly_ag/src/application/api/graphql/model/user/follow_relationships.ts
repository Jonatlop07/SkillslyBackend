import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@application/api/graphql/model/user/user';

@ObjectType()
export class FollowRelationships {
  @Field(type => [User])
  public pending_followers: Array<User>;

  @Field(type => [User])
  public pending_users_to_follow: Array<User>;

  @Field(type => [User])
  public followers: Array<User>;

  @Field(type => [User])
  public following_users: Array<User>;
}
