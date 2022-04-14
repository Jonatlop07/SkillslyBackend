import { SearchedUserDTO } from '@core/domain/use-case/search/dto/searched_user.dto'
import FollowRequestCollectionDTO from '@core/domain/use-case/follow_request/dto/follow_request_collection.dto'

export default interface GetFollowUserRequestCollectionOutputModel {
  follow_request_collection: FollowRequestCollectionDTO;
}
