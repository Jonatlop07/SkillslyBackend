import { FollowRequestDTO } from '@core/domain/use-case/follow_request/persistence/follow_request.dto'

export default interface ExistsFollowUserRequest {
  existsFollowUserRequest(params: FollowRequestDTO): Promise<boolean>;
  existsFollowUserRelationship(params: FollowRequestDTO): Promise<boolean>;
}
