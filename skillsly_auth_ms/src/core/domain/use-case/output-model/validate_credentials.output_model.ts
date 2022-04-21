import { Id } from '@core/common/type/common_types';

export default interface ValidateCredentialsOutputModel {
  id: Id;
  email: string;
  is_two_factor_auth_enabled: boolean;
}
