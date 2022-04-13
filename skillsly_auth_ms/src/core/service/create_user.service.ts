import { Inject, Logger } from '@nestjs/common';
import CreateUserInteractor from '@core/domain/use-case/interactor/create_user.interactor';
import { UserDITokens } from '@core/domain/di/user_di_tokens';
import CreateUserGateway from '@core/domain/use-case/gateway/create_user.gateway';
import {
  InvalidCredentialsFormatException,
  UserAlreadyExistsException
} from '@core/domain/use-case/exception/auth.exception';
import { UserDTO } from '@core/domain/use-case/dto/user.dto';
import { User } from '@core/domain/entity/user';
import { UserMapper } from '@core/domain/use-case/mapper/user.mapper';
import CreateUserInputModel from '@core/domain/use-case/input-model/create_user.input_model';
import CreateUserOutputModel from '@core/domain/use-case/output-model/create_user.output_model';
import { uuid } from 'uuidv4';
import generateHashedPassword from '@core/common/util/validator/generate_hashed_password';

export class CreateUserService implements CreateUserInteractor {
  private readonly logger: Logger = new Logger(CreateUserService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private gateway: CreateUserGateway,
  ) {}

  public async execute(input: CreateUserInputModel): Promise<CreateUserOutputModel> {
    const { email, password } = input;
    const user_to_create = new User({
      id: uuid(),
      email,
      password,
      access_token: null,
      two_factor_auth_secret: null,
      updated_at: null,
      is_two_factor_auth_enabled: false,
      reset_password_token: null
    });
    const credentials_have_valid_format = user_to_create.hasValidEmail() && user_to_create.hasValidPassword();
    if (!credentials_have_valid_format)
      throw new InvalidCredentialsFormatException();
    if (await this.gateway.exists({ email: user_to_create.email }))
      throw new UserAlreadyExistsException();
    const user_to_create_dto = UserMapper.toUserDTO(user_to_create);
    user_to_create_dto.password = generateHashedPassword(user_to_create_dto.password);
    const created_user: UserDTO = await this.gateway.create(user_to_create_dto);
    return { id: created_user.id, email: created_user.email };
  }
}
