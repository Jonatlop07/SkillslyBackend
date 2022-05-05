import { CreateAccountService as AuthCreateAccountService } from '@application/service/auth/requester/create_account.service';
import { CreateAccountService as UserCreateAccountService } from '@application/service/user/requester/create_account.service';
import { CreateGroupConversationService } from '@application/service/chat/requester/create_group_conversation.service'
import { ConversationResolver } from '@application/api/graphql/resolver/conversation.resolver'
import { CreateCommentService } from '@application/service/comments/comment/requester/create_comment.service'
import { UpdateGroupConversationDetailsService } from '@application/service/chat/requester/update_group_conversation_details.service'
import { UpdateAccountService } from '@application/service/user/requester/update_account.service'
import { UpdateCommentService } from '@application/service/comments/comment/requester/update_comment.service'
import { DeleteInnerCommentService } from '@application/service/comments/inner_comment/requester/delete_comment.service'
import { DeleteServiceService } from '@application/service/service/requester/delete_service.service'
import { CreateStoryService } from '@application/service/story/requester/create_story.service'
import { CreateInnerCommentService } from '@application/service/comments/inner_comment/requester/create_comment.service'
import { AuthDITokens } from '@application/service/auth/di/auth_di_tokens'
import { UpdateInnerCommentService } from '@application/service/comments/inner_comment/requester/update_comment.service'
import { StoryDITokens } from '@application/service/story/di/story_di_tokens'
import { UpdateCredentialsService } from '@application/service/auth/requester/update_credentials.service'
import { CreateApplicationService } from '@application/service/service/requester/create_application.service'
import { GetConversationMessagesService } from '@application/service/chat/requester/get_conversation_messages.service'
import { GetConversationsCollectionService } from '@application/service/chat/requester/get_conversations_collection.service'
import { CreateServiceService } from '@application/service/service/requester/create_service.service'
import { UserDITokens } from '@application/service/user/di/user_di_tokens'
import { ChatDITokens } from '@application/service/chat/di/chat_di_tokens'
import { ServiceResolver } from '@application/api/graphql/resolver/service.resolver'
import { QueryUserStoryCollectionService } from '@application/service/story/requester/query_user_story_collection.service'
import { NotificationDITokens } from '@application/service/notification/di/notification_di_tokens'
import { ApplicationResolver } from '@application/api/graphql/resolver/application.resolver'
import { CreatePostService } from '@application/service/post/requester/create_post.service'
import { UpdatePostService } from '@application/service/post/requester/update_post.service'
import { UpdateFollowUserRequestService } from '@application/service/user/requester/update_follow_user_request.service'
import { CreatePrivateConversationService } from '@application/service/chat/requester/create_private_conversation.service'
import { CommentResolver } from '@application/api/graphql/resolver/comment.resolver'
import { DeleteCommentService } from '@application/service/comments/comment/requester/delete_comment.service'
import { DeleteCommentsByOwnerService } from '@application/service/comments/comment/requester/delete_owner_comments.service'
import { DeleteAccountService } from '@application/service/user/requester/delete_account.service'
import { InnerCommentDITokens } from '@application/service/comments/inner_comment/di/inner_comment_di_tokens'
import { InnerCommentResolver } from '@application/api/graphql/resolver/inner_comment.resolver'
import { CreateFollowUserRequestService } from '@application/service/user/requester/create_follow_user_request.service'
import { NotificationResolver } from '@application/api/graphql/resolver/notification.resolver'
import { ServiceDITokens } from '@application/service/service/di/service_di_tokens'
import { SendMessageToConversationService } from '@application/service/chat/requester/send_message_to_conversation.service'
import { ExitGroupConversationService } from '@application/service/chat/requester/exit_group_conversation.service'
import { ServiceApplicationsService } from '@application/service/service/requester/service_applications.service'
import { StoryResolver } from '@application/api/graphql/resolver/story.resolver'
import { PostResolver } from '@application/api/graphql/resolver/post.resolver'
import { RequestDITokens } from '@application/common/request/request_di_tokens'
import { SendNotificationService } from '@application/service/notification/requester/send_notification.service'
import { QueryUserService } from '@application/service/user/requester/query_user.service'
import { DeleteUserStoryCollectionService } from '@application/service/story/requester/delete_user_story_collection.service'
import { CommentDITokens } from '@application/service/comments/comment/di/comment_di_tokens'
import { QueryInnerCommentsService } from '@application/service/comments/inner_comment/requester/query_comments.service'
import { DeleteApplicationService } from '@application/service/service/requester/delete_application.service'
import { SocialResolver } from '@application/api/graphql/resolver/social.resolver'
import { DeleteConversationService } from '@application/service/chat/requester/delete_conversation.service'
import { QueryNotificationsService } from '@application/service/notification/requester/query_notifications.service'
import { QueryFollowRelationshipsService } from '@application/service/user/requester/query_follow_relationships.service'
import { ListServiceService } from '@application/service/service/requester/list_service.service'
import { QueryStoryService } from '@application/service/story/requester/query_story.service'
import { DeleteInnerCommentsByOwnerService } from '@application/service/comments/inner_comment/requester/delete_owner_inner_comments.service'
import { SearchUsersService } from '@application/service/user/requester/search_users.service'
import { DeleteStoryService } from '@application/service/story/requester/delete_story.service'
import { QueryPostCollectionService } from '@application/service/post/requester/query_post_collection.service'
import { DeletePostService } from '@application/service/post/requester/delete_post.service'
import { Module, Provider } from '@nestjs/common'
import { AddMembersGroupConversationService } from '@application/service/chat/requester/add_members_group_conversation.service'
import { QueryCommentsService } from '@application/service/comments/comment/requester/query_comments.service'
import { DeleteFollowUserRequestService } from '@application/service/user/requester/delete_follow_user_request.service'
import { PostDITokens } from '@application/service/post/di/post_di_tokens'
import { AccountResolver } from '@application/api/graphql/resolver/account.resolver'
import { QueryPostService } from '@application/service/post/requester/query_post.service'
import { DeleteUserService } from '@application/service/auth/requester/delete_user.service'
import { HttpModule } from '@nestjs/axios'
import { Request } from '@application/common/request/request'
import { AuthQueryUserService } from '@application/service/auth/requester/query_user.service'
import { ValidateCredentialsService } from '@application/service/auth/requester/validate_credentials.service'
import { UpdateUserService } from '@application/service/auth/requester/update_user.service'
import { GraphQLTwoFactorAuthService } from '@application/api/graphql/authentication/service/graphql_two_factor_auth.service'
import { GraphQLAuthenticationService } from '@application/api/graphql/authentication/service/graphql_authentication.service'
import { GraphQLLocalStrategy } from '@application/api/graphql/authentication/passport/graphql_local.strategy'
import { GraphQLJwtStrategy } from '@application/api/graphql/authentication/passport/graphql_jwt.strategy'
import { GraphQLJwtTwoFactorAuthStrategy } from '@application/api/graphql/authentication/passport/graphql_jwt_two_factor_auth.strategy'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RequestResetPasswordService } from '@application/service/auth/requester/request_reset_password.service'
import { ResetPasswordService } from '@application/service/auth/requester/reset_password.service'
import { AuthResolver } from '@application/api/graphql/resolver/auth.resolver'
import { APP_GUARD } from '@nestjs/core'
import { GraphQLJwtTwoFactorAuthGuard } from '@application/api/graphql/authentication/guard/graphql_jwt_two_factor_auth.guard'

const request_providers = [
  {
    provide: RequestDITokens.Request,
    useClass: Request,
  },
];

const auth_providers: Array<Provider> = [
  {
    provide: AuthDITokens.CreateUserService,
    useFactory: (request) => new AuthCreateAccountService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: AuthDITokens.UpdateCredentialsService,
    useFactory: (request) => new UpdateCredentialsService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: AuthDITokens.UpdateUserService,
    useFactory: (request) => new UpdateUserService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: AuthDITokens.DeleteUserService,
    useFactory: (request) => new DeleteUserService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: AuthDITokens.QueryUserService,
    useFactory: (request) => new AuthQueryUserService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: AuthDITokens.ValidateCredentialsService,
    useFactory: (request) => new ValidateCredentialsService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: AuthDITokens.RequestResetPasswordService,
    useFactory: (request) => new RequestResetPasswordService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: AuthDITokens.ResetPasswordService,
    useFactory: (request) => new ResetPasswordService(request),
    inject: [RequestDITokens.Request]
  }
];

const user_providers: Array<Provider> = [
  {
    provide: UserDITokens.CreateUserService,
    useFactory: (request) => new UserCreateAccountService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: UserDITokens.QueryUserService,
    useFactory: (request) => new QueryUserService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: UserDITokens.UpdateAccountService,
    useFactory: (request) => new UpdateAccountService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: UserDITokens.DeleteAccountService,
    useFactory: (request) => new DeleteAccountService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: UserDITokens.SearchUsersService,
    useFactory: (request) => new SearchUsersService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: UserDITokens.QueryFollowRelationshipsService,
    useFactory: (request) => new QueryFollowRelationshipsService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: UserDITokens.CreateFollowUserRequestService,
    useFactory: (request) => new CreateFollowUserRequestService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: UserDITokens.UpdateFollowUserRequestService,
    useFactory: (request) => new UpdateFollowUserRequestService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: UserDITokens.DeleteFollowUserRequestService,
    useFactory: (request) => new DeleteFollowUserRequestService(request),
    inject: [RequestDITokens.Request],
  },
];

const story_providers: Array<Provider> = [
  {
    provide: StoryDITokens.QueryStoryService,
    useFactory: (request) => new QueryStoryService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: StoryDITokens.QueryStoryCollectionService,
    useFactory: (request) => new QueryUserStoryCollectionService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: StoryDITokens.CreateStoryService,
    useFactory: (request) => new CreateStoryService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: StoryDITokens.DeleteStoryService,
    useFactory: (request) => new DeleteStoryService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: StoryDITokens.DeleteStoryCollectionService,
    useFactory: (request) => new DeleteUserStoryCollectionService(request),
    inject: [RequestDITokens.Request],
  },
];

const comment_providers: Array<Provider> = [
  {
    provide: CommentDITokens.CreateCommentService,
    useFactory: (request) => new CreateCommentService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: CommentDITokens.QueryCommentsService,
    useFactory: (request) => new QueryCommentsService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: CommentDITokens.UpdateCommentService,
    useFactory: (request) => new UpdateCommentService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: CommentDITokens.DeleteCommentService,
    useFactory: (request) => new DeleteCommentService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: CommentDITokens.DeleteCommentsByOwnerService,
    useFactory: (request) => new DeleteCommentsByOwnerService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: InnerCommentDITokens.CreateInnerCommentService,
    useFactory: (request) => new CreateInnerCommentService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: InnerCommentDITokens.QueryInnerCommentsService,
    useFactory: (request) => new QueryInnerCommentsService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: InnerCommentDITokens.UpdateInnerCommentService,
    useFactory: (request) => new UpdateInnerCommentService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: InnerCommentDITokens.DeleteInnerCommentService,
    useFactory: (request) => new DeleteInnerCommentService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: InnerCommentDITokens.DeleteInnerCommentsByOwnerService,
    useFactory: (request) => new DeleteInnerCommentsByOwnerService(request),
    inject: [RequestDITokens.Request],
  },
];

const notification_providers: Array<Provider> = [
  {
    provide: NotificationDITokens.SendNotificationService,
    useFactory: (request) => new SendNotificationService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: NotificationDITokens.QueryNotificationsService,
    useFactory: (request) => new QueryNotificationsService(request),
    inject: [RequestDITokens.Request],
  },
];

const post_providers: Array<Provider> = [
  {
    provide: PostDITokens.QueryPostService,
    useFactory: (request) => new QueryPostService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: PostDITokens.QueryPostCollectionService,
    useFactory: (request) => new QueryPostCollectionService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: PostDITokens.CreatePostService,
    useFactory: (request) => new CreatePostService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: PostDITokens.DeletePostService,
    useFactory: (request) => new DeletePostService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: PostDITokens.UpdatedPostService,
    useFactory: (request) => new UpdatePostService(request),
    inject: [RequestDITokens.Request],
  },
];

const application_providers: Array<Provider> = [
  {
    provide: ServiceDITokens.CreateApplicationService,
    useFactory: (request) => new CreateApplicationService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: ServiceDITokens.DeleteApplicationService,
    useFactory: (request) => new DeleteApplicationService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: ServiceDITokens.ServiceApplicationsService,
    useFactory: (request) => new ServiceApplicationsService(request),
    inject: [RequestDITokens.Request]
  }
];

const service_providers: Array<Provider> = [
  {
    provide: ServiceDITokens.CreateServiceService,
    useFactory: (request) => new CreateServiceService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: ServiceDITokens.DeleteServiceService,
    useFactory: (request) => new DeleteServiceService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: ServiceDITokens.ListServiceService,
    useFactory: (request) => new ListServiceService(request),
    inject: [RequestDITokens.Request]
  }
]
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
  }
];

const resolvers: Array<Provider> = [
  AuthResolver,
  AccountResolver,
  SocialResolver,
  StoryResolver,
  PostResolver,
  CommentResolver,
  InnerCommentResolver,
  StoryResolver,
  NotificationResolver,
  ApplicationResolver,
  ServiceResolver,
  ConversationResolver,
];

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config_service: ConfigService) => ({
        secret: config_service.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${config_service.get<string>('JWT_EXPIRATION_TIME')}m`,
        },
      }),
    }),
  ],
  providers: [
    GraphQLTwoFactorAuthService,
    GraphQLAuthenticationService,
    GraphQLLocalStrategy,
    GraphQLJwtStrategy,
    GraphQLJwtTwoFactorAuthStrategy,
    ...request_providers,
    ...auth_providers,
    ...user_providers,
    ...story_providers,
    ...post_providers,
    ...resolvers,
    ...comment_providers,
    ...notification_providers,
    ...application_providers,
    ...service_providers,
    ...resolvers,
    ...chat_providers,
    ...resolvers,
    {
      provide: APP_GUARD,
      useClass: GraphQLJwtTwoFactorAuthGuard,
    },
  ]
})
export class AppModule {}
