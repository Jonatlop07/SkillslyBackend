import { Id } from '@core/common/type/common_types';

export default interface UpdateCredentialsOutputModel {
  id: Id;
  email: string;
  is_two_factor_auth_enabled: boolean;
}
