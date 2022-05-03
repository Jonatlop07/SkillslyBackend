import {Id} from '@application/common/type/common_types';

export default interface SendMessageToConversationRequestInput {
  Content: string,
  OwnerUserID: Id,
  ConversationID: Id,
}