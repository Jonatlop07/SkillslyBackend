import { Id, Nullable } from '@core/common/type/common_types'
import { Gender } from '@core/domain/entity/type/gender.enum'

export interface UserDTO {
  id: Id;
  email: string;
  name: string;
  date_of_birth: Date;
  gender: Gender;
  created_at: Nullable<Date>;
  updated_at: Nullable<Date>;
}
