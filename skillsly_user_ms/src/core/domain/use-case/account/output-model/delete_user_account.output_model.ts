import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'

export default interface DeleteUserAccountOutputModel {
  deleted_user: UserDTO
}
