import { Id } from '@core/common/type/common_types'
import { Gender } from '@core/domain/entity/type/gender.enum'

export default interface UserRequestDetailsDTO {
  id: Id;
  name: string;
  email: string;
  gender: Gender;
}
