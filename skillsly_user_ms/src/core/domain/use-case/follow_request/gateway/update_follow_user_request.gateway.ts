import FindOne from '@core/common/persistence/find_one'
import UserQueryModel from '@core/domain/use-case/common/query-model/user.query_model'
import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'
import UpdateFollowUserRequest from '@core/domain/use-case/follow_request/persistence/update_follow_request'
import ExistsFollowUserRequest from '@core/domain/use-case/follow_request/persistence/exists_follow_request'

export default interface UpdateFollowUserRequestGateway
  extends  UpdateFollowUserRequest, ExistsFollowUserRequest, FindOne<UserQueryModel, UserDTO> {}
