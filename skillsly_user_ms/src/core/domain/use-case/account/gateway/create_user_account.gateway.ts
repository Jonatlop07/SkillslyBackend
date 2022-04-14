import Create from '@core/common/persistence/create'
import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'
import Exists from '@core/common/persistence/exists'
import UserQueryModel from '@core/domain/use-case/common/query-model/user.query_model'

export default interface CreateUserAccountGateway
  extends Create<UserDTO, UserDTO>, Exists<UserQueryModel> {}
