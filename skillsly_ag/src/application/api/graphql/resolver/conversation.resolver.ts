import {Inject, Logger} from '@nestjs/common';
import {ChatDITokens} from '@application/service/chat/di/chat_di_tokens';
import {
  CreatePrivateConversationService
} from '@application/service/chat/requester/create_private_conversation.service';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UserDITokens} from '@application/service/user/di/user_di_tokens';
import {QueryUserService} from '@application/service/user/requester/query_user.service';
import {PrivateConversation} from '@application/api/graphql/model/chat/input/private_conversation';
import {GroupConversation} from '@application/api/graphql/model/chat/input/group_conversation';
import {CreateGroupConversationService} from '@application/service/chat/requester/create_group_conversation.service';
import {DeleteConversationService} from '@application/service/chat/requester/delete_conversation.service';
import {DeleteConversation} from '@application/api/graphql/model/chat/input/delete_conversation';
import {ExitGroupConversationService} from '@application/service/chat/requester/exit_group_conversation.service';
import {
  GetConversationsCollectionService
} from '@application/service/chat/requester/get_conversations_collection.service';
import {Conversation} from '@application/api/graphql/model/chat/conversation';
import {GetConversations} from '@application/api/graphql/model/chat/input/get_conversations';
import {AddMembersConversation} from '@application/api/graphql/model/chat/input/add_members_conversation';
import {
  AddMembersGroupConversationService
} from '@application/service/chat/requester/add_members_group_conversation.service';
import {
  SendMessageToConversationService
} from '@application/service/chat/requester/send_message_to_conversation.service';
import {SendMessage} from '@application/api/graphql/model/chat/input/send_message';
import {Message} from '@application/api/graphql/model/chat/message';
import {GetConversationMessages} from '@application/api/graphql/model/chat/input/get_conversation_messages';
import {GetConversationMessagesService} from '@application/service/chat/requester/get_conversation_messages.service';
import {
  UpdateGroupConversationDetailsService
} from '@application/service/chat/requester/update_group_conversation_details.service';
import {UpdateConversation} from '@application/api/graphql/model/chat/input/update_conversation';
import {ConversationMapper} from '@application/api/graphql/mapper/conversation.mapper';
import {MessageMapper} from '@application/api/graphql/mapper/message.mapper';

@Resolver()
export class ConversationResolver {
  private readonly logger: Logger = new Logger(ConversationResolver.name);

  constructor(
    @Inject(ChatDITokens.CreatePrivateConversationService)
    private readonly create_private_conversation_service: CreatePrivateConversationService,
    @Inject(ChatDITokens.CreateGroupConversationService)
    private readonly create_group_conversation_service: CreateGroupConversationService,
    @Inject(ChatDITokens.DeleteConversationService)
    private readonly delete_conversation_service: DeleteConversationService,
    @Inject(ChatDITokens.ExitGroupConversationService)
    private readonly exit_group_conversation_service: ExitGroupConversationService,
    @Inject(ChatDITokens.GetConversationsCollectionService)
    private readonly get_conversations_collection_service: GetConversationsCollectionService,
    @Inject(ChatDITokens.AddMembersGroupConversationService)
    private readonly add_members_group_conversation_service: AddMembersGroupConversationService,
    @Inject(ChatDITokens.SendMessageToConversationService)
    private readonly send_message_to_conversation_service: SendMessageToConversationService,
    @Inject(ChatDITokens.GetConversationMessagesService)
    private readonly get_conversation_messages_service: GetConversationMessagesService,
    @Inject(ChatDITokens.UpdateGroupConversationDetailsService)
    private readonly update_group_details_service: UpdateGroupConversationDetailsService,
    @Inject(UserDITokens.QueryUserService)
    private readonly query_user_service: QueryUserService
  ) {
  }

  @Mutation(() => String)
  public async createPrivateConversation(
  @Args({
    name: 'private_conversation',
    type: () => PrivateConversation
  }) private_conversation: PrivateConversation
  ) {
    try {
      await this.query_user_service.execute({id: private_conversation.member_user_id});
      this.logger.log('Creating private chat with chat service...');
      await this.create_private_conversation_service.execute({
        CreatorUserID: private_conversation.creator_user_id,
        MemberUserID: private_conversation.member_user_id
      });
      this.logger.log('Private chat was created successfully');
      return 'Private chat was created successfully';
    } catch (e) {
      this.logger.log('Error creating chat, member user account doesn\'t exist');
      return 'Error creating chat, member user account doesn\'t exist';
    }
  }

  @Mutation(() => String)
  public async createGroupConversation(
  @Args({
    name: 'group_conversation',
    type: () => GroupConversation
  }) group_conversation: GroupConversation
  ) {
    try {
      for (const member of group_conversation.members) {
        await this.query_user_service.execute({id: member.UserID});
      }
      this.logger.log('Creating group chat with group chat service...');
      await this.create_group_conversation_service.execute({
        RequestUserID: group_conversation.request_user_id,
        Description: group_conversation.description,
        Name: group_conversation.name,
        Members: group_conversation.members,
        IsPrivate: group_conversation.is_private
      });
      const resultString = 'Group chat was created successfully';
      this.logger.log(resultString);
      return resultString;
    } catch (e) {
      const resultString = 'Error creating group chat: some member user account doesn\'t exist';
      this.logger.log(resultString);
      return resultString;
    }
  }

  @Mutation(() => String)
  public async deleteConversation(
  @Args({
    name: 'delete_conversation',
    type: () => DeleteConversation
  }) delete_conversation: DeleteConversation
  ) {
    try {
      await this.query_user_service.execute({id: delete_conversation.user_id});
      this.logger.log('Deleting chat with chat service...');
      await this.delete_conversation_service.execute({
        ConversationID: delete_conversation.conversation_id,
        UserID: delete_conversation.user_id,
      });
      const resultString = 'Conversation was deleted successfully';
      this.logger.log(resultString);
      return resultString;
    } catch (e) {
      const resultString = 'Error deleting chat, user account doesn\'t exist' + e;
      this.logger.log(resultString);
      return resultString;
    }
  }

  @Mutation(() => String)
  public async exitGroupConversation(
  @Args({
    name: 'exit_group_conversation',
    type: () => DeleteConversation
  }) exit_group_conversation: DeleteConversation
  ) {
    try {
      await this.query_user_service.execute({id: exit_group_conversation.user_id});
    } catch (e) {
      const resultString = 'Error: this user doesn\'t exist';
      this.logger.log(resultString);
      return resultString;
    }

    try {
      this.logger.log('Exiting chat with chat service...');
      await this.exit_group_conversation_service.execute({
        ConversationID: exit_group_conversation.conversation_id,
        UserID: exit_group_conversation.user_id,
      });
      const resultString = 'Exited successfully from this chat';
      this.logger.log(resultString);
      return resultString;
    } catch (e) {
      const resultString = 'Error while exiting chat ';
      this.logger.log(resultString);
      return resultString;
    }
  }

  @Query(() => [Conversation])
  public async getConversationsCollection(
  @Args({
    name: 'get_conversations_collection',
    type: () => GetConversations
  }) get_conversations: GetConversations
  ) {
    try {
      await this.query_user_service.execute({id: get_conversations.user_id});
      this.logger.log('Retrieving conversations with chat service...');
      const result = await this.get_conversations_collection_service.execute({
        UserID: get_conversations.user_id
      });
      const response = [];
      result.Conversations.forEach((conversation) => {
        response.push(ConversationMapper.toGraphQLModel(conversation));
      });
      return response;
    } catch (e) {
      const resultString = 'Error retrieving conversations, member user account doesn\'t exist';
      this.logger.log(resultString);
      return [];
    }
  }

  @Mutation(() => String)
  public async addMembersGroupConversation(
  @Args({
    name: 'add_members_conversation',
    type: () => AddMembersConversation
  }) add_members_conversation: AddMembersConversation
  ) {
    try {
      for (const member of add_members_conversation.users_ids) {
        await this.query_user_service.execute({id: member});
      }
      this.logger.log('Adding members to chat with chat service...');
      await this.add_members_group_conversation_service.execute({
        ConversationID: add_members_conversation.conversation_id,
        UsersIDs: add_members_conversation.users_ids
      });
      const resultString = 'Members were added to chat successfully';
      this.logger.log(resultString);
      return resultString;
    } catch (e) {
      const resultString = 'Error adding members: some members doesn\'t exist';
      this.logger.log(resultString);
      return resultString;
    }
  }

  @Mutation(() => String)
  public async sendMessageToConversation(
  @Args({
    name: 'message_to_conversation',
    type: () => SendMessage
  }) message_to_conversation: SendMessage
  ) {
    this.logger.log('Sending message to chat with message service...');

    await this.send_message_to_conversation_service.execute({
      ConversationID: message_to_conversation.conversation_id,
      Content: message_to_conversation.content,
      OwnerUserID: message_to_conversation.owner_user_id
    });
    const resultMessage = 'Message added succesfully';
    this.logger.log(resultMessage);
    return resultMessage;
  }

  @Query(() => [Message])
  public async getConversationMessages(
  @Args({
    name: 'get_messages',
    type: () => GetConversationMessages
  }) get_messages: GetConversationMessages
  ) {
    const result = await this.get_conversation_messages_service.execute({
      ConversationID: get_messages.conversation_id
    });
    const response = [];
    result.messages.forEach((message) => {
      response.push(MessageMapper.toGraphQLModel(message));
    });
    return response;

  }

  @Mutation(() => String)
  public async updateConversationDetails(
  @Args({
    name: 'update_conversation',
    type: () => UpdateConversation
  }) update_conversation: UpdateConversation
  ) {
    this.logger.log('Updating conversation with conversation service ...');
    await this.update_group_details_service.execute({
      ConversationID: update_conversation.conversation_id,
      Name: update_conversation.name,
      Description: update_conversation.description,
      IsPrivate: update_conversation.is_private
    });
    const resultString = 'Conversation details were updated successfully';
    this.logger.log(resultString);
    return resultString;
  }


}