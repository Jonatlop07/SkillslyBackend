import {Id} from '@application/common/type/common_types';

export interface MemberModel {
  user_id: Id,
  is_admin: boolean,
  is_active: boolean,
  joined_at: string
}
