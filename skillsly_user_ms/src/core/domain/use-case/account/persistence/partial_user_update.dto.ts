import { Gender } from '@core/domain/entity/type/gender.enum'

export interface  PartialUserUpdateDTO {
  email?: string;
  name?: string;
  date_of_birth?: string;
  gender?: Gender;
}
