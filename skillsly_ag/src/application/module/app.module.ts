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
import { Module, Provider } from '@nestjs/common';
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
import { CommentResolver } from '@application/api/graphql/resolver/comment.resolver';
import { InnerCommentResolver } from '@application/api/graphql/resolver/inner_comment.resolver';

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
];

const resolvers: Array<Provider> = [
  AccountResolver,
  SocialResolver,
  CommentResolver,
  InnerCommentResolver,
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
    ...comment_providers,
    ...resolvers,
  ],
})
export class AppModule {}
