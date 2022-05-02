import { Module, Provider } from '@nestjs/common';
import { AccountResolver } from '@application/api/graphql/resolver/account.resolver';
import { QueryUserService } from '@application/service/user/requester/query_user.service';
import { CreateAccountService as AuthCreateUserAccountService } from '@application/service/auth/requester/create_account.service';
import { CreateAccountService as UserCreateUserAccountService } from '@application/service/user/requester/create_account.service';
import { Request } from '@application/common/request/request';
import { HttpModule } from '@nestjs/axios';
import { RequestDITokens } from '@application/common/request/request_di_tokens';
import { AuthDITokens } from '@application/service/auth/di/auth_di_tokens';
import { UserDITokens } from '@application/service/user/di/user_di_tokens';
import { UpdateAccountService } from '@application/service/user/requester/update_account.service';
import { UpdateCredentialsService } from '@application/service/auth/requester/update_credentials.service';
import { DeleteUserService } from '@application/service/auth/requester/delete_user.service';
import { DeleteAccountService } from '@application/service/user/requester/delete_account.service';
import { SearchUsersService } from '@application/service/user/requester/search_users.service';
import { SocialResolver } from '@application/api/graphql/resolver/social.resolver';
import { QueryFollowRelationshipsService } from '@application/service/user/requester/query_follow_relationships.service';
import { CreateFollowUserRequestService } from '@application/service/user/requester/create_follow_user_request.service';
import { UpdateFollowUserRequestService } from '@application/service/user/requester/update_follow_user_request.service';
import { DeleteFollowUserRequestService } from '@application/service/user/requester/delete_follow_user_request.service';
import { StoryDITokens } from '@application/service/story/di/story_di_tokens';
import { QueryStoryService } from '@application/service/story/requester/query_story.service';
import { QueryUserStoryCollectionService } from '@application/service/story/requester/query_user_story_collection.service';
import { CreateStoryService } from '@application/service/story/requester/create_story.service';
import { DeleteStoryService } from '@application/service/story/requester/delete_story.service';
import { StoryResolver } from '@application/api/graphql/resolver/story.resolver';
import { PostResolver } from '@application/api/graphql/resolver/post.resolver';
import { PostDITokens } from '@application/service/post/di/post_di_tokens';
import { CreatePostService } from '@application/service/post/requester/create_post.service';
import { UpdatePostService } from '@application/service/post/requester/update_post.service';
import { QueryPostService } from '@application/service/post/requester/query_post.service';
import { QueryPostCollectionService } from '@application/service/post/requester/query_post_collection.service';
import { DeletePostService } from '@application/service/post/requester/delete_post.service';
import { DeleteUserStoryCollectionService } from '@application/service/story/requester/delete_user_story_collection.service';
import { CommentDITokens } from '@application/service/comments/comment/di/comment_di_tokens';
import { CreateCommentService } from '@application/service/comments/comment/requester/create_comment.service';
import { DeleteCommentService } from '@application/service/comments/comment/requester/delete_comment.service';
import { QueryCommentsService } from '@application/service/comments/comment/requester/query_comments.service';
import { UpdateCommentService } from '@application/service/comments/comment/requester/update_comment.service';
import { CreateInnerCommentService } from '@application/service/comments/inner_comment/requester/create_comment.service';
import { DeleteInnerCommentService } from '@application/service/comments/inner_comment/requester/delete_comment.service';
import { QueryInnerCommentsService } from '@application/service/comments/inner_comment/requester/query_comments.service';
import { UpdateInnerCommentService } from '@application/service/comments/inner_comment/requester/update_comment.service';
import { InnerCommentDITokens } from '@application/service/comments/inner_comment/di/inner_comment_di_tokens';
import { DeleteCommentsByOwnerService } from '@application/service/comments/comment/requester/delete_owner_comments.service';
import { DeleteInnerCommentsByOwnerService } from '@application/service/comments/inner_comment/requester/delete_owner_inner_comments.service';
import { CommentResolver } from '@application/api/graphql/resolver/comment.resolver';
import { InnerCommentResolver } from '@application/api/graphql/resolver/inner_comment.resolver';
import { NotificationDITokens } from '@application/service/notification/di/notification_di_tokens';
import { SendNotificationService } from '@application/service/notification/requester/send_notification.service';
import { QueryNotificationsService } from '@application/service/notification/requester/query_notifications.service';
import { NotificationResolver } from '@application/api/graphql/resolver/notification.resolver';

const request_providers = [
  {
    provide: RequestDITokens.Request,
    useClass: Request,
  },
];

const auth_providers: Array<Provider> = [
  {
    provide: AuthDITokens.CreateUserService,
    useFactory: (request) => new AuthCreateUserAccountService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: AuthDITokens.UpdateCredentialsService,
    useFactory: (request) => new UpdateCredentialsService(request),
    inject: [RequestDITokens.Request],
  },
  {
    provide: AuthDITokens.DeleteUserService,
    useFactory: (request) => new DeleteUserService(request),
    inject: [RequestDITokens.Request],
  },
];

const user_providers: Array<Provider> = [
  {
    provide: UserDITokens.CreateUserService,
    useFactory: (request) => new UserCreateUserAccountService(request),
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

const resolvers: Array<Provider> = [
  AccountResolver,
  SocialResolver,
  StoryResolver,
  PostResolver,
  CommentResolver,
  InnerCommentResolver,
  StoryResolver,
  NotificationResolver,
];

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    ...request_providers,
    ...auth_providers,
    ...user_providers,
    ...story_providers,
    ...post_providers,
    ...resolvers,
    ...comment_providers,
    ...notification_providers,
    ...resolvers,
  ],
})
export class AppModule {}
