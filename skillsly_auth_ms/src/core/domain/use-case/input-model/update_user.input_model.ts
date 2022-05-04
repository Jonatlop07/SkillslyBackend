import { Id } from '@core/common/type/common_types'

export default interface UpdateUserInputModel {
  user_id: Id;
  access_token?: string;
  two_factor_auth_secret?: string;
  is_two_factor_auth_enabled?: boolean;
  reset_password_token?: string;
}
