import UpdateUserInputModel from '@core/domain/use-case/input-model/update_user.input_model'
import { UserDTO } from '@core/domain/use-case/dto/user.dto'
import UpdateUserOutputModel from '@core/domain/use-case/output-model/update_user.output_model'
import UpdateUserGateway from '@core/domain/use-case/gateway/update_user.gateway'
import { Inject, Logger } from '@nestjs/common'
import UpdateUserInteractor from '@core/domain/use-case/interactor/update_user.interactor'
import { UserDITokens } from '@core/domain/di/user_di_tokens'
import { UserNotFoundException } from '@core/domain/use-case/exception/auth.exception'
import { User } from '@core/domain/entity/user'

export class UpdateUserService implements UpdateUserInteractor {
  private readonly logger: Logger = new Logger(UpdateUserService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private gateway: UpdateUserGateway,
  ) {}

  public async execute(input: UpdateUserInputModel): Promise<UpdateUserOutputModel> {
    const { user_id, is_two_factor_auth_enabled, two_factor_auth_secret, reset_password_token, access_token } = input;
    const existing_user: UserDTO = await this.gateway.findOne({ id: user_id });
    if (!existing_user)
      throw new UserNotFoundException();
    const user_to_update = new User({
      ...existing_user,

    });
    const updated_user: UserDTO = await this.gateway.partialUpdate({ id: user_id },  {
      is_two_factor_auth_enabled,
      two_factor_auth_secret,
      reset_password_token,
      access_token
    });
    return {
      user: updated_user
    };
  }
}
