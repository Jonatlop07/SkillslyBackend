import FindOne from '@core/common/persistence/find_one'
import UserQueryModel from '@core/domain/use-case/common/query-model/user.query_model'
import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'
import ExistsFollowUserRequest from '@core/domain/use-case/follow_request/persistence/exists_follow_request'
import DeleteUserRelationship from '@core/domain/use-case/follow_request/persistence/delete_follow_request'

export default interface DeleteFollowUserRequestGateway
  extends DeleteUserRelationship, ExistsFollowUserRequest, FindOne<UserQueryModel, UserDTO> {}
