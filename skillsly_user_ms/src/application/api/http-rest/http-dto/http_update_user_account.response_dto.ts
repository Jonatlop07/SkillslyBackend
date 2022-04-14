import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'

export default interface UpdateUserAccountResponseDTO {
  updated_account: UserDTO;
}
