import { Id } from '@core/common/type/common_types'
import { Gender } from '@core/domain/entity/type/gender.enum'

export interface SearchedUserDTO {
  id: Id,
  email: string,
  name: string,
  date_of_birth: Date,
  gender: Gender
}
