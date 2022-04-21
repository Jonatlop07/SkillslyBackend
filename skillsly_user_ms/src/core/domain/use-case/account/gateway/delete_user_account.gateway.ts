import Delete from '@core/common/persistence/delete'
import UserQueryModel from '@core/domain/use-case/common/query-model/user.query_model'
import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'
import FindOne from '@core/common/persistence/find_one'

export default interface DeleteUserAccountGateway extends FindOne<UserQueryModel, UserDTO>, Delete<UserQueryModel, UserDTO> {}
