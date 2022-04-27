import { Args, Query, Resolver } from '@nestjs/graphql'
import { User } from '@application/api/graphql/model/user/user'
import { SearchParams } from '@application/api/graphql/model/user/input/search_params'
import { Inject, Logger } from '@nestjs/common'
import { SearchUsersService } from '@application/service/user/requester/search_users.service'
import { UserMapper } from '@application/api/graphql/mapper/user.mapper'
import { UserDITokens } from '@application/service/user/di/user_di_tokens'

@Resolver(() => User)
export class SocialResolver {
  private readonly logger: Logger = new Logger(SocialResolver.name);

  constructor(
    @Inject(UserDITokens.SearchUsersService)
    private readonly search_users_service: SearchUsersService
  ) {}

  @Query(() => [User])
  public async searchUsers(@Args({ name: 'search_params', type: () => SearchParams }) search_params: SearchParams) {
    this.logger.log(`Searching user in user service...`);
    const { users } = await this.search_users_service.execute({
      ...search_params
    });
    this.logger.log(`Search in user service successfully made`);
    return users.map(UserMapper.toGraphQLModel);
  }
}
