import FindOne from '@core/common/persistence/find_one'
import UserQueryModel from '@core/domain/use-case/common/query-model/user.query_model'
import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'

export default interface QueryUserAccountGateway extends FindOne<UserQueryModel, UserDTO> {}
