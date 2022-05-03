import {MessageModel} from '@application/common/model/message.model';

export class MessageMapper {
  public static toGraphQLModel(message) : MessageModel {
    const {
      ConversationID,
      Content,
      Path,
      OwnerUserID,
      CreatedAt,
      UpdatedAt,
    } = message;

    return {
      conversation_id : ConversationID,
      created_at: CreatedAt,
      updated_at : UpdatedAt,
      content: Content,
      path: Path,
      owner_user_id: OwnerUserID
    };
  }
}