import { FollowRequestDTO } from '@core/domain/use-case/follow_request/persistence/follow_request.dto'
import { Id } from '@core/common/type/common_types'

export default interface CreateFollowUserRequest {
  createFollowUserRequest(params: FollowRequestDTO): Promise<Id>;
}
