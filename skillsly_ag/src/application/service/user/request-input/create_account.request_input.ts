import { Id } from '@application/common/type/common_types'

export default interface CreateAccountRequestInput {
  id: Id;
  email: string;
  name: string;
  date_of_birth: string;
  gender: string;
}
