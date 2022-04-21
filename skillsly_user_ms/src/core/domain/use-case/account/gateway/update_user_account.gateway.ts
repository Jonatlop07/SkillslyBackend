import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'
import FindOne from '@core/common/persistence/find_one'
import UserQueryModel from '@core/domain/use-case/common/query-model/user.query_model'
import { PartialUpdateByParams } from '@core/common/persistence/partial_update_by_params'
import { PartialUserUpdateDTO } from '@core/domain/use-case/account/persistence/partial_user_update.dto'

export default interface UpdateUserAccountGateway
  extends PartialUpdateByParams<UserQueryModel, PartialUserUpdateDTO, UserDTO>, FindOne<UserQueryModel, UserDTO> {}
