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

const providers: Array<Provider> = [
  {
    provide: RequestDITokens.Request,
    useClass: Request
  },
  {
    provide: AuthDITokens.CreateUserService,
    useFactory: (request) => new AuthCreateUserAccountService(request),
    inject: [RequestDITokens.Request]
  },
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
  AccountResolver
]

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5
    })
  ],
  providers
})
export class AppModule {

}
