import DeleteUserInteractor from '@core/domain/use-case/interactor/delete_user.interactor';
import DeleteUserInputModel from '@core/domain/use-case/input-model/delete_user.input_model';
import DeleteUserOutputModel from '@core/domain/use-case/output-model/delete_user.output_model';
import { Inject, Logger } from '@nestjs/common';
import { UserDITokens } from '@core/domain/di/user_di_tokens';
import DeleteUserGateway from '@core/domain/use-case/gateway/delete_user.gateway';
import { UserDTO } from '@core/domain/use-case/dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { InvalidCredentialsException, UserNotFoundException } from '@core/domain/use-case/exception/auth.exception';

export class DeleteUserService implements DeleteUserInteractor {
  private readonly logger: Logger = new Logger(DeleteUserService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly gateway: DeleteUserGateway
  ) {}

  public async execute(input: DeleteUserInputModel): Promise<DeleteUserOutputModel> {
    const { id, password } = input;
    const user: UserDTO = await this.gateway.findOne({ id });
    if (!user) {
      throw new UserNotFoundException();
    }
    if (!bcrypt.compareSync(password, user.password))
      throw new InvalidCredentialsException();
    await this.gateway.delete({ id });
    return {
      deleted_user: user
    };
  }
}
