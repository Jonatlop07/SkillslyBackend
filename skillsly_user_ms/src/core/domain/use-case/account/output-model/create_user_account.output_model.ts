import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'

export default interface CreateUserAccountOutputModel {
  created_account: UserDTO
}
