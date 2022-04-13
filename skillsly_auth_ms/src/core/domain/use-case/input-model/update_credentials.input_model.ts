import { Id } from '@core/common/type/common_types';

export default interface UpdateCredentialsInputModel {
  id: Id;
  email: string;
  password: string;
}
