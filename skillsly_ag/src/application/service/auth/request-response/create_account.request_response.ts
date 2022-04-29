import { Id } from '@application/common/type/common_types'

export default interface CreateAccountRequestResponse {
  id: Id;
  email: string;
}
