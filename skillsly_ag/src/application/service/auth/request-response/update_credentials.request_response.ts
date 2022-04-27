import { Id } from '@application/common/type/common_types'

export default interface UpdateCredentialsRequestResponse {
  id: Id;
  email: string;
  is_two_factor_auth_enabled: boolean;
}
