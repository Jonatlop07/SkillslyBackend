import CreateUserFollowRequestGateway
  from '@core/domain/use-case/follow_request/gateway/create_follow_user_request.gateway'
import UpdateUserFollowRequestGateway
  from '@core/domain/use-case/follow_request/gateway/update_follow_user_request.gateway'
import DeleteUserFollowRequestGateway
  from '@core/domain/use-case/follow_request/gateway/delete_follow_user_request.gateway'
import GetUserFollowRequestCollectionGateway
  from '@core/domain/use-case/follow_request/gateway/get_follow_user_request.gateway'

export default interface UserRelationshipRepository extends CreateUserFollowRequestGateway, UpdateUserFollowRequestGateway,
  DeleteUserFollowRequestGateway, GetUserFollowRequestCollectionGateway {}
