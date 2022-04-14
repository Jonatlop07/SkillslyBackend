import { Gender } from '@core/domain/entity/type/gender.enum'

export default interface CreateUserAccountInputModel {
  email: string;
  name: string;
  date_of_birth: Date;
  gender: Gender;
}
