import { Id } from '@application/common/type/common_types';

export default interface UpdateCredentialsRequestInput {
  user_id: Id;
  email?: string;
  password?: string;
}
