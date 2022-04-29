import { Id } from '@application/common/type/common_types'
import StoryModel from '@application/service/story/model/story.model'
import { StoryMapper } from '@application/api/graphql/mapper/story.mapper'
import { FollowingUsersStories } from '@application/api/graphql/model/story/following_users_stories'

export class FollowingUsersStoriesMapper {
  public static toGraphQLModel(friend_id: Id, stories: Array<StoryModel>): FollowingUsersStories {
    return {
      friend_id,
      stories: stories.map(StoryMapper.toGraphQLModel)
    };
  }
}
