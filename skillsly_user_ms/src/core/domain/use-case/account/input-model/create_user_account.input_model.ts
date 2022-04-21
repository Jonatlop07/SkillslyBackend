import { Gender } from '@core/domain/entity/type/gender.enum'

export default interface CreateUserAccountInputModel {
  id: string;
  email: string;
  name: string;
  date_of_birth: string;
  gender: Gender;
}
