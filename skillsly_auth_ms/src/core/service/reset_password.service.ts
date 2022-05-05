import ResetPasswordInteractor from '@core/domain/use-case/interactor/reset_password.interactor'
import ResetPasswordInputModel from '@core/domain/use-case/input-model/reset_password.input_model'
import ResetPasswordOutputModel from '@core/domain/use-case/output-model/reset_password.output_model'
import { Inject } from '@nestjs/common'
import { UserDITokens } from '@core/domain/di/user_di_tokens'
import { UserDTO } from '@core/domain/use-case/dto/user.dto'
import {
  InvalidCredentialsFormatException,
  UserNotFoundException
} from '@core/domain/use-case/exception/auth.exception'
import { UserMapper } from '@core/domain/use-case/mapper/user.mapper'
import generateHashedPassword from '@core/common/util/validator/generate_hashed_password'
import ResetPasswordGateway from '@core/domain/use-case/gateway/reset_password.gateway'

export class ResetPasswordService implements ResetPasswordInteractor {
  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly gateway: ResetPasswordGateway
  ) {
  }

  public async execute(input: ResetPasswordInputModel): Promise<ResetPasswordOutputModel> {
    const { reset_password_token, password } = input;
    const resulting_user_dto: UserDTO = await this.gateway.findOne({
      reset_password_token,
    });
    if (!resulting_user_dto) {
      throw new UserNotFoundException();
    }
    resulting_user_dto.password = password;
    const resulting_user = UserMapper.toUser(resulting_user_dto);
    if (!resulting_user.hasValidPassword()) {
      throw new InvalidCredentialsFormatException ();
    }
    const email = resulting_user_dto.email;
    await this.gateway.partialUpdate(
      {
        email,
      },
      {
        password: await generateHashedPassword(password),
        reset_password_token: null,
      },
    );
    return {};
  }
}
