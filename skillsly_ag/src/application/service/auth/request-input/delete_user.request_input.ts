import { Id } from '@application/common/type/common_types';

export default interface DeleteUserRequestInput {
  user_id: Id;
  password?: string;
}
