import {Id} from '@application/common/type/common_types';

export interface MessageModel {
  conversation_id: Id,
  content: string,
  path: string,
  owner_user_id: Id,
  created_at: string,
  updated_at: string
}
