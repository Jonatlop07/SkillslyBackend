import { Inject, Logger } from '@nestjs/common'
import DeleteUserAccountOutputModel from '@core/domain/use-case/account/output-model/delete_user_account.output_model'
import DeleteUserAccountGateway from '@core/domain/use-case/account/gateway/delete_user_account.gateway'
import { DeleteUserAccountInteractor } from '@core/domain/use-case/account/interactor/delete_user_account.interactor'
import { UserDITokens } from '@core/domain/di/user_di_tokens'
import DeleteUserAccountInputModel from '@core/domain/use-case/account/input-model/delete_user_account.input_model'
import { UserDTO } from '@core/domain/use-case/common/dto/user.dto';
import { UserAccountNotFoundException } from '@core/domain/use-case/common/exception/user_account.exception'

export class DeleteUserAccountService implements DeleteUserAccountInteractor {
  private readonly logger: Logger = new Logger(DeleteUserAccountService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly gateway: DeleteUserAccountGateway
  ) {
  }

  public async execute({ id }: DeleteUserAccountInputModel): Promise<DeleteUserAccountOutputModel> {
    const user_to_delete: UserDTO = await this.gateway.findOne({ id });
    if (!user_to_delete)
      throw new UserAccountNotFoundException();
    await this.gateway.delete({ id });
    return {
      deleted_user: user_to_delete
    };
  }
}
