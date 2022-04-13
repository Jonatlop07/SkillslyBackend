export interface PartialUserUpdateDTO {
  email?: string;
  password?: string;
  access_token?: string;
  is_two_factor_auth_enabled?: boolean;
  two_factor_auth_secret?: string;
  reset_password_token?: string;
}
