import {Id} from '@application/common/type/common_types';
import {MemberModel} from '@application/common/model/member.model';
import {MessageModel} from '@application/common/model/message.model';

export interface ConversationModel {
  conversation_id: Id,
  creator_user_id: Id,
  name: string,
  description: string,
  members: Array<MemberModel>,
  messages: Array<MessageModel>,
  created_at: string,
  updated_at: string,
  is_private: boolean
}
