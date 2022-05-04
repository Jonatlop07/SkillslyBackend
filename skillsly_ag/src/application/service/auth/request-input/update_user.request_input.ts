import { Id } from '@application/common/type/common_types'

export default interface UpdateUserRequestInput {
  user_id: Id;
  access_token?: string;
  two_factor_auth_secret?: string;
  is_two_factor_auth_enabled?: boolean;
  reset_password_token?: string;
}
