import { SearchedUserDTO } from '@core/domain/use-case/search/dto/searched_user.dto'

export default interface FollowRequestCollectionDTO {
  pending_followers: Array<SearchedUserDTO>;
  pending_users_to_follow: Array<SearchedUserDTO>;
  followers: Array<SearchedUserDTO>;
  following_users: Array<SearchedUserDTO>;
}
