import { FollowRequestDTO } from '@core/domain/use-case/follow_request/persistence/follow_request.dto'

export default interface UpdateFollowUserRequest {
  acceptFollowUserRequest(params: FollowRequestDTO): Promise<void>;
  rejectFollowUserRequest(params: FollowRequestDTO): Promise<void>;
}
