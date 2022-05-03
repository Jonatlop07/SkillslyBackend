import {Id} from '@application/common/type/common_types';

export default interface ExitGroupConversationRequestInput {
  ConversationID: Id;
  UserID: Id
}