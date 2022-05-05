import { Id } from '@application/common/type/common_types'

export default interface ValidateCredentialsRequestResponse {
  id: Id;
  email: string;
  is_two_factor_auth_enabled: boolean;
}
