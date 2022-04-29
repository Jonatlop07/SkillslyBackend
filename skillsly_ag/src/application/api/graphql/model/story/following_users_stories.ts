import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Id } from '@application/common/type/common_types'
import { Story } from '@application/api/graphql/model/story/story'

@ObjectType()
export class FollowingUsersStories {
  @Field(() => ID)
  public friend_id: Id;

  @Field(() => [Story])
  public stories: Array<Story>;
}
