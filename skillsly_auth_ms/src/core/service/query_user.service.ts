import QueryUserInteractor from '@core/domain/use-case/interactor/query_user.interactor'
import QueryUserInputModel from '@core/domain/use-case/input-model/query_user.input_model'
import QueryUserOutputModel from '@core/domain/use-case/output-model/query_user.output_model'
import { Inject } from '@nestjs/common'
import { UserDITokens } from '@core/domain/di/user_di_tokens'
import QueryUserGateway from '@core/domain/use-case/gateway/query_user.gateway'
import { UserDTO } from '@core/domain/use-case/dto/user.dto'

export class QueryUserService implements QueryUserInteractor {
  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly gateway: QueryUserGateway
  ) {

  }

  public async execute(input: QueryUserInputModel): Promise<QueryUserOutputModel> {
    const user: UserDTO = await this.gateway.findOne({
      id: input.user_id
    });
    return {
      user
    };
  }
}
