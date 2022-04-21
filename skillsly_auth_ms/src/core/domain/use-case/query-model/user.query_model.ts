import { Id } from '@core/common/type/common_types';

export default interface UserQueryModel {
  id?: Id;
  email?: string;
  reset_password_token?: string;
}
