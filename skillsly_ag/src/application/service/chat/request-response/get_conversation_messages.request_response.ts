import {MessageModel} from '@application/common/model/message.model';

export default interface GetConversationMessagesRequestResponse{
  messages: Array<MessageModel>
}