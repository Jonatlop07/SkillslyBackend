export class ChatDITokens {
  public static readonly CreatePrivateConversationService: unique symbol = Symbol('CreatePrivateConversationService');
  public static readonly CreateGroupConversationService: unique symbol = Symbol('CreateGroupConversationService');
  public static readonly DeleteConversationService: unique symbol = Symbol('DeleteConversationService');
  public static readonly ExitGroupConversationService: unique symbol = Symbol('ExitGroupConversationService');
  public static readonly GetConversationsCollectionService: unique symbol = Symbol('GetConversationsCollectionService');
  public static readonly AddMembersGroupConversationService: unique symbol = Symbol('AddMembersGroupConversationService');
  public static readonly SendMessageToConversationService: unique symbol = Symbol('SendMessageToConversationService');
  public static readonly GetConversationMessagesService: unique symbol = Symbol('GetConversationMessagesService');
  public static readonly UpdateGroupConversationDetailsService: unique symbol = Symbol('UpdateGroupConversationDetailsService');
}