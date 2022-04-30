import { Module, Provider } from '@nestjs/common'
import { AccountResolver } from '@application/api/graphql/resolver/account.resolver'
import { QueryUserService } from '@application/service/user/requester/query_user.service'
import { CreateAccountService as AuthCreateUserAccountService } from '@application/service/auth/requester/create_account.service'
import { CreateAccountService as UserCreateUserAccountService } from '@application/service/user/requester/create_account.service'
import { Request } from '@application/common/request/request'
import { HttpModule } from '@nestjs/axios'
import { RequestDITokens } from '@application/common/request/request_di_tokens'
import { AuthDITokens } from '@application/service/auth/di/auth_di_tokens'
import { UserDITokens } from '@application/service/user/di/user_di_tokens'
import { UpdateAccountService } from '@application/service/user/requester/update_account.service'
import { UpdateCredentialsService } from '@application/service/auth/requester/update_credentials.service'
import { DeleteUserService } from '@application/service/auth/requester/delete_user.service'
import { DeleteAccountService } from '@application/service/user/requester/delete_account.service'
import { SearchUsersService } from '@application/service/user/requester/search_users.service'
import { SocialResolver } from '@application/api/graphql/resolver/social.resolver'
import { QueryFollowRelationshipsService } from '@application/service/user/requester/query_follow_relationships.service'
import { CreateFollowUserRequestService } from '@application/service/user/requester/create_follow_user_request.service'
import { UpdateFollowUserRequestService } from '@application/service/user/requester/update_follow_user_request.service'
import { DeleteFollowUserRequestService } from '@application/service/user/requester/delete_follow_user_request.service'
import { StoryDITokens } from '@application/service/story/di/story_di_tokens'
import { QueryStoryService } from '@application/service/story/requester/query_story.service'
import { QueryUserStoryCollectionService } from '@application/service/story/requester/query_user_story_collection.service'
import { CreateStoryService } from '@application/service/story/requester/create_story.service'
import { DeleteStoryService } from '@application/service/story/requester/delete_story.service'
import { StoryResolver } from '@application/api/graphql/resolver/story.resolver'
import { DeleteUserStoryCollectionService } from '@application/service/story/requester/delete_user_story_collection.service'

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
  },
  {
    provide: UserDITokens.QueryFollowRelationshipsService,
    useFactory: (request) => new QueryFollowRelationshipsService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: UserDITokens.CreateFollowUserRequestService,
    useFactory: (request) => new CreateFollowUserRequestService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: UserDITokens.UpdateFollowUserRequestService,
    useFactory: (request) => new UpdateFollowUserRequestService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: UserDITokens.DeleteFollowUserRequestService,
    useFactory: (request) => new DeleteFollowUserRequestService(request),
    inject: [RequestDITokens.Request]
  }
];

const story_providers: Array<Provider> = [
  {
    provide: StoryDITokens.QueryStoryService,
    useFactory: (request) => new QueryStoryService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: StoryDITokens.QueryStoryCollectionService,
    useFactory: (request) => new QueryUserStoryCollectionService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: StoryDITokens.CreateStoryService,
    useFactory: (request) => new CreateStoryService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: StoryDITokens.DeleteStoryService,
    useFactory: (request) => new DeleteStoryService(request),
    inject: [RequestDITokens.Request]
  },
  {
    provide: StoryDITokens.DeleteStoryCollectionService,
    useFactory: (request) => new DeleteUserStoryCollectionService(request),
    inject: [RequestDITokens.Request]
  },
];

const resolvers: Array<Provider> = [
  AccountResolver,
  SocialResolver,
  StoryResolver
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
    ...story_providers,
    ...resolvers
  ]
})
export class AppModule {}
