import { Inject, Logger } from '@nestjs/common'
import QueryUserAccountInputModel from '@core/domain/use-case/account/input-model/query_user_interactor.input_model'
import QueryUserAccountGateway from '@core/domain/use-case/account/gateway/query_user_account.gateway'
import { QueryUserAccountInteractor } from '@core/domain/use-case/account/interactor/query_user_account.interactor'
import { UserDTO } from '@core/domain/use-case/common/dto/user.dto'
import QueryUserAccountOutputModel from '@core/domain/use-case/account/output-model/query_user_interactor.output_model'
import { UserDITokens } from '@core/domain/di/user_di_tokens'
import { UserAccountNotFoundException } from '@core/domain/use-case/common/exception/user_account.exception'

export class QueryUserAccountService implements QueryUserAccountInteractor {
  private readonly logger: Logger = new Logger(QueryUserAccountService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly gateway: QueryUserAccountGateway
  ) {}

  public async execute(input: QueryUserAccountInputModel): Promise<QueryUserAccountOutputModel> {
    const { id } = input;
    const user: UserDTO = await this.gateway.findOne({ id });
    if (!user)
      throw new UserAccountNotFoundException();
    return {
      account_details: user
    };
  }
}
