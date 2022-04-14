import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'

export default interface UpdateUserAccountOutputModel {
  updated_account: UserDTO;
}
