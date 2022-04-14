import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'

export default interface CreateUserAccountResponseDTO {
  created_account: UserDTO;
}
