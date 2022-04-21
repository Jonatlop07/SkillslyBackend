import { Inject, Injectable, Logger } from '@nestjs/common';
import { UserDITokens } from '@core/domain/di/user_di_tokens';
import ValidateCredentialsInteractor from '@core/domain/use-case/interactor/validate_credentials.interactor';
import ValidateCredentialsInputModel from '@core/domain/use-case/input-model/validate_credentials.input_model';
import ValidateCredentialsOutputModel from '@core/domain/use-case/output-model/validate_credentials.output_model';
import { UserDTO } from '@core/domain/use-case/dto/user.dto';
import { InvalidCredentialsException, UserNotFoundException } from '@core/domain/use-case/exception/auth.exception';
import ValidateCredentialsGateway from '@core/domain/use-case/gateway/validate_credentials.gateway';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ValidateCredentialsService implements ValidateCredentialsInteractor {
  private readonly logger: Logger = new Logger(ValidateCredentialsService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly gateway: ValidateCredentialsGateway
  ) {}

  public async execute(input: ValidateCredentialsInputModel): Promise<ValidateCredentialsOutputModel> {
    const resulting_user: UserDTO = await this.gateway.findOne({ email: input.email });
    if (!resulting_user)
      throw new UserNotFoundException();
    if (!bcrypt.compareSync(input.password, resulting_user.password))
      throw new InvalidCredentialsException();
    return {
      id: resulting_user.id,
      email: resulting_user.email,
      is_two_factor_auth_enabled: resulting_user.is_two_factor_auth_enabled
    };
  }
}
