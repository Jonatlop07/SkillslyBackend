import {ConversationModel} from '@application/common/model/conversation.model';

export default interface GetConversationsCollectionRequestResponse{
  Conversations: Array<ConversationModel>
}