import { CreateAccountService as AuthCreateAccountService } from '@application/service/auth/requester/create_account.service'
import { Args, Mutation, Query } from '@nestjs/graphql'
import { User } from '@application/api/graphql/model/user'
import { CreateAccountService as UserCreateAccountService } from '@application/service/user/requester/create_account.service'
import { NewUser } from '@application/api/graphql/model/new_user'
import { UserMapper } from '@application/api/graphql/mapper/user.mapper'
import { UserModel } from '@application/common/model/user.model'
import { QueryUserService } from '@application/service/user/requester/query_user.service'
import { Inject, Logger } from '@nestjs/common'
import { AuthDITokens } from '@application/service/auth/di/auth_di_tokens'
import { UserDITokens } from '@application/service/user/di/user_di_tokens'

export class AccountResolver {
  constructor(
    @Inject(AuthDITokens.CreateUserService)
    private readonly auth_create_account_service: AuthCreateAccountService,
    @Inject(UserDITokens.CreateUserService)
    private readonly user_create_account_service: UserCreateAccountService,
    @Inject(UserDITokens.QueryUserService)
    private readonly query_user_service: QueryUserService
  ) {}

  private readonly logger: Logger = new Logger(AccountResolver.name);

  @Mutation(returns => User)
  public async createUserAccount(
    @Args({
      name: 'account_details',
      type: () => NewUser
    }) account_details: NewUser
  ) {
    this.logger.log(`Creating user in auth service...`);
    const { id } = await this.auth_create_account_service.execute({
      email: account_details.email,
      password: account_details.password
    });
    this.logger.log(`User in auth service successfully created`);
    this.logger.log(`Creating user account in user service...`);
    const { created_account } = await this.user_create_account_service.execute({
      id,
      ...account_details
    });
    this.logger.log(`User account in user service successfully created`);
    return UserMapper.toGraphQLModel(created_account);
  }

  @Query(() => User)
  public async queryUser(@Args({ name: 'id' }) id: string) {
    const { account_details } = await this.query_user_service.execute({ id });
    return UserMapper.toGraphQLModel(account_details);
  }
}
