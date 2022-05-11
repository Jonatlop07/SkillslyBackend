import {Id} from '@application/common/type/common_types';

export default interface UpdateGroupConversationDetailsRequestInput {
  ConversationID: Id,
  Name: string,
  Description: string,
  IsPrivate: boolean
}