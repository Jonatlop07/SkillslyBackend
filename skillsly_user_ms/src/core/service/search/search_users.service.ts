import { Inject, Logger } from '@nestjs/common'
import SearchUsersGateway from '@core/domain/use-case/search/gateway/search_users.gateway'
import SearchUsersOutputModel from '@core/domain/use-case/search/output-model/search_users.output_model'
import SearchUsersInputModel from '@core/domain/use-case/search/input-model/search_users.input_model'
import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'
import { SearchedUserDTO } from '@core/domain/use-case/search/dto/searched_user.dto'
import { SearchUsersInteractor } from '@core/domain/use-case/search/interactor/search_users.interactor'
import { UserDITokens } from '@core/domain/di/user_di_tokens'

export class SearchUsersService implements SearchUsersInteractor {
  private readonly logger: Logger = new Logger(SearchUsersService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private gateway: SearchUsersGateway
  ) {}

  public async execute(input: SearchUsersInputModel): Promise<SearchUsersOutputModel> {
    const { email, name } = input;
    const users: Array<UserDTO> = await this.gateway.findAll({ email, name });
    return { users: users.map((user: UserDTO) => user as SearchedUserDTO) };
  }
}
