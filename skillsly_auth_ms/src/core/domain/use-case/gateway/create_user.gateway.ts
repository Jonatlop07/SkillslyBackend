import Create from '@core/common/persistence/create'
import { UserDTO } from '@core/domain/use-case/dto/user.dto'
import Exists from '@core/common/persistence/exists'
import UserQueryModel from '@core/domain/use-case/query-model/user.query_model'

export default interface CreateUserGateway extends Create<UserDTO, UserDTO>, Exists<UserQueryModel> {}
