import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'

export default interface QueryUserAccountOutputModel {
  account_details: UserDTO
}
