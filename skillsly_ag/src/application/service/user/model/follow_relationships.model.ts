import { UserModel } from '@application/common/model/user.model'

export default interface FollowRelationshipsModel {
  pending_followers: Array<UserModel>;
  pending_users_to_follow: Array<UserModel>;
  followers: Array<UserModel>;
  following_users: Array<UserModel>;
}
