import {ConversationModel} from '@application/common/model/conversation.model';

export class ConversationMapper {
  public static toGraphQLModel(conversation) : ConversationModel {
    console.log(conversation);
    const {
      CreatorUserID,
      Name,
      Description,
      Members,
      Messages,
      CreatedAt,
      UpdatedAt,
      IsPrivate,
      ConversationID
    } = conversation;

    const members = [];
    Members.forEach(mem => {
      members.push({
        user_id: mem.UserID,
        is_admin: mem.IsAdmin,
        is_active: mem.IsActive,
        joined_at: mem.JoinedAt
      });
    });

    return {
      creator_user_id: CreatorUserID,
      created_at: CreatedAt,
      description: Description,
      is_private: IsPrivate,
      members: members,
      messages: Messages,
      updated_at: UpdatedAt,
      name: Name,
      conversation_id: ConversationID
    };
  }
}