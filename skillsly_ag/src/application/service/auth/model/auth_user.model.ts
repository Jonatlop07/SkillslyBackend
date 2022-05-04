import { Id, Nullable } from '@application/common/type/common_types';

export default interface AuthUserModel {
  id: Id,
  email: string;
  password: string;
  access_token: Nullable<string>;
  two_factor_auth_secret: Nullable<string>;
  updated_at: Nullable<Date>;
  is_two_factor_auth_enabled: boolean;
}
