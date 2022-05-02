import { FollowRequestDTO } from '@core/domain/use-case/follow_request/persistence/follow_request.dto'

export default interface DeleteUserRelationship {
  deleteUserRelationship(params: FollowRequestDTO): Promise<string>;
}
