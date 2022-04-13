import { Inject, Logger } from '@nestjs/common';
import { UserDITokens } from '@core/domain/di/user_di_tokens';
import {
  InvalidCredentialsFormatException,
  UserAlreadyExistsException, UserNotFoundException,
} from '@core/domain/use-case/exception/auth.exception';
import { UserDTO } from '@core/domain/use-case/dto/user.dto';
import { User } from '@core/domain/entity/user';
import UpdateCredentialsInteractor from '@core/domain/use-case/interactor/update_credentials.interactor';
import UpdateCredentialsInputModel from '@core/domain/use-case/input-model/update_credentials.input_model';
import UpdateCredentialsOutputModel from '@core/domain/use-case/output-model/update_credentials.output_model';
import UpdateCredentialsGateway from '@core/domain/use-case/gateway/update_credentials.gateway';
import * as bcrypt from 'bcryptjs';
import generateHashedPassword from '@core/common/util/validator/generate_hashed_password';

export class UpdateCredentialsService implements UpdateCredentialsInteractor {
  private readonly logger: Logger = new Logger(UpdateCredentialsService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private gateway: UpdateCredentialsGateway,
  ) {}

  public async execute(input: UpdateCredentialsInputModel): Promise<UpdateCredentialsOutputModel> {
    const { id, email, password } = input;
    const existing_user: UserDTO = await this.gateway.findOne({ id });
    if (!existing_user)
      throw new UserNotFoundException();
    const user_to_update = new User({
      ...existing_user,
      email,
      password
    });
    const new_credentials_have_valid_format = user_to_update.hasValidEmail() && user_to_update.hasValidPassword();
    if (!new_credentials_have_valid_format)
      throw new InvalidCredentialsFormatException();
    const email_unchanged = user_to_update.email === existing_user.email;
    const password_unchanged = bcrypt.compareSync(user_to_update.password, existing_user.password);
    if (email_unchanged && password_unchanged) {
      const { id, email, is_two_factor_auth_enabled } = existing_user;
      return { id, email, is_two_factor_auth_enabled }
    }
    if (password_unchanged) {
      const exists_user_with_email = await this.gateway.findOne({ email: user_to_update.email });
      if (exists_user_with_email)
        throw new UserAlreadyExistsException();
    }
    const hashed_password = generateHashedPassword(user_to_update.password);
    const updated_user: UserDTO = await this.gateway.partialUpdate({ id },  {
      email, password: hashed_password
    });
    return {
      id: updated_user.id,
      email: updated_user.email,
      is_two_factor_auth_enabled: updated_user.is_two_factor_auth_enabled
    };
  }
}
