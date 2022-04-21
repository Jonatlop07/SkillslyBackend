import FollowRequestCollectionDTO from '@core/domain/use-case/follow_request/dto/follow_request_collection.dto'
import { PaginationDTO } from '@core/common/persistence/pagination.dto'

export default interface GetFollowUserRequestCollection {
  getFollowUserRequestCollection(id: string): Promise<FollowRequestCollectionDTO>;
}
