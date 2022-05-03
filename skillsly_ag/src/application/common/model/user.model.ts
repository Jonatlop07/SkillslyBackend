import { Id } from '@application/common/type/common_types';

export interface UserModel {
  id: Id;
  email: string;
  name: string;
  date_of_birth: string;
  gender: string;
  created_at: string;
  updated_at: string;
}
