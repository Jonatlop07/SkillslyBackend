import {Module, Provider} from '@nestjs/common';
import {AccountResolver} from '@application/api/graphql/resolver/account.resolver';
import {QueryUserService} from '@application/service/user/requester/query_user.service';
import {
  CreateAccountService as AuthCreateUserAccountService
} from '@application/service/auth/requester/create_account.service';
import {
  CreateAccountService as UserCreateUserAccountService
} from '@application/service/user/requester/create_account.service';
import {Request} from '@application/common/request/request';
import {HttpModule} from '@nestjs/axios';
import {RequestDITokens} from '@application/common/request/request_di_tokens';
import {AuthDITokens} from '@application/service/auth/di/auth_di_tokens';
import {UserDITokens} from '@application/service/user/di/user_di_tokens';
import {UpdateAccountService} from '@application/service/user/requester/update_account.service';
import {UpdateCredentialsService} from '@application/service/auth/requester/update_credentials.service';
import {DeleteUserService} from '@application/service/auth/requester/delete_user.service';
import {DeleteAccountService} from '@application/service/user/requester/delete_account.service';
import {SearchUsersService} from '@application/service/user/requester/search_users.service';
import {SocialResolver} from '@application/api/graphql/resolver/social.resolver';
import {ChatDITokens} from '@application/service/chat/di/chat_di_tokens';
import {
  CreatePrivateConversationService
} from '@application/service/chat/requester/create_private_conversation.service';
import {ConversationResolver} from '@application/api/graphql/resolver/conversation.resolver';
import {CreateGroupConversationService} from '@application/service/chat/requester/create_group_conversation.service';
import {DeleteConversationService} from '@application/service/chat/requester/delete_conversation.service';
import {ExitGroupConversationService} from '@application/service/chat/requester/exit_group_conversation.service';
import {
  GetConversationsCollectionService
} from '@application/service/chat/requester/get_conversations_collection.service';
import {
  AddMembersGroupConversationService
} from '@application/service/chat/requester/add_members_group_conversation.service';
import {
  SendMessageToConversationService
} from '@application/service/chat/requester/send_message_to_conversation.service';
import {GetConversationMessagesService} from '@application/service/chat/requester/get_conversation_messages.service';
import {
  UpdateGroupConversationDetailsService
} from '@application/service/chat/requester/update_group_conversation_details.service';

const request_providers = [
  {
    provide: RequestDITokens.Request,
    useClass: Request
  },
];

const auth_providers: Array<Provider> = [
  {
    provide: AuthDITokens.CreateUserService,
    useFactory: (request) => new AuthCreateUserAccountService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: AuthDITokens.UpdateCredentialsService,
    useFactory: (request) => new UpdateCredentialsService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: AuthDITokens.DeleteUserService,
    useFactory: (request) => new DeleteUserService(request),
    inject: [RequestDITokens.Request]
  }
];

const user_providers: Array<Provider> = [
  {
    provide: UserDITokens.CreateUserService,
    useFactory: (request) => new UserCreateUserAccountService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: UserDITokens.QueryUserService,
    useFactory: (request) => new QueryUserService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: UserDITokens.UpdateAccountService,
    useFactory: (request) => new UpdateAccountService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: UserDITokens.DeleteAccountService,
    useFactory: (request) => new DeleteAccountService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: UserDITokens.SearchUsersService,
    useFactory: (request) => new SearchUsersService(request),
    inject: [RequestDITokens.Request]
  }
];

const chat_providers: Array<Provider> = [
  {
    provide: ChatDITokens.CreatePrivateConversationService,
    useFactory: (request) => new CreatePrivateConversationService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: ChatDITokens.CreateGroupConversationService,
    useFactory: (request) => new CreateGroupConversationService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: ChatDITokens.DeleteConversationService,
    useFactory: (request) => new DeleteConversationService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: ChatDITokens.ExitGroupConversationService,
    useFactory: (request) => new ExitGroupConversationService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: ChatDITokens.GetConversationsCollectionService,
    useFactory: (request) => new GetConversationsCollectionService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: ChatDITokens.AddMembersGroupConversationService,
    useFactory: (request) => new AddMembersGroupConversationService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: ChatDITokens.SendMessageToConversationService,
    useFactory: (request) => new SendMessageToConversationService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: ChatDITokens.GetConversationMessagesService,
    useFactory: (request) => new GetConversationMessagesService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: ChatDITokens.UpdateGroupConversationDetailsService,
    useFactory: (request) => new UpdateGroupConversationDetailsService(request),
    inject: [RequestDITokens.Request]
  },
];

const resolvers: Array<Provider> = [
  AccountResolver,
  SocialResolver,
  ConversationResolver,
];

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    })
  ],
  providers: [
    ...request_providers,
    ...auth_providers,
    ...user_providers,
    ...chat_providers,
    ...resolvers
  ]
})
export class AppModule {

}
