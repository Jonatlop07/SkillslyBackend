import FollowRelationshipsModel from '@application/service/user/model/follow_relationships.model'
import { FollowRelationships } from '@application/api/graphql/model/user/follow_relationships'
import { UserMapper } from '@application/api/graphql/mapper/user.mapper'

export class FollowRelationshipsMapper {
  public static toGraphQLModel(follow_relationships: FollowRelationshipsModel): FollowRelationships {
    return {
      pending_followers: follow_relationships.pending_followers.map(UserMapper.toGraphQLModel),
      pending_users_to_follow: follow_relationships.pending_users_to_follow.map(UserMapper.toGraphQLModel),
      followers: follow_relationships.followers.map(UserMapper.toGraphQLModel),
      following_users: follow_relationships.following_users.map(UserMapper.toGraphQLModel)
    }
  }
}
