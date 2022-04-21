import { Inject, Logger } from '@nestjs/common';
import { UserDTO } from '@core/domain/use-case/common/dto/user.dto';
import { CreateUserAccountInteractor } from '@core/domain/use-case/account/interactor/create_user_account.interactor';
import {
  UserAccountAlreadyExistsException,
  UserAccountInvalidDataFormatException
} from '@core/domain/use-case/common/exception/user_account.exception';
import { UserDITokens } from '@core/domain/di/user_di_tokens';
import CreateUserAccountGateway from '@core/domain/use-case/account/gateway/create_user_account.gateway';
import CreateUserAccountInputModel from '@core/domain/use-case/account/input-model/create_user_account.input_model';
import CreateUserAccountOutputModel from '@core/domain/use-case/account/output-model/create_user_account.output_model';
import { User } from '@core/domain/entity/user';
import { UserMapper } from '@core/domain/use-case/common/mapper/user.mapper';
import { uuid } from 'uuidv4';

export class CreateUserAccountService implements CreateUserAccountInteractor {
  private readonly logger: Logger = new Logger(CreateUserAccountService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private gateway: CreateUserAccountGateway
  ) {
  }

  public async execute(input: CreateUserAccountInputModel): Promise<CreateUserAccountOutputModel> {
    const { email, name, date_of_birth, gender } = input;
    const user_to_create = new User({
      id: uuid(),
      email,
      name,
      date_of_birth,
      gender,
      created_at: null,
      updated_at: null
    });
    const data_have_valid_format = user_to_create.hasValidEmail() && user_to_create.hasValidName()
      && user_to_create.hasValidDateOfBirth() && user_to_create.hasValidGender();
    if (!data_have_valid_format)
      throw new UserAccountInvalidDataFormatException();
    if (await this.gateway.exists({ email: user_to_create.email }))
      throw new UserAccountAlreadyExistsException();
    const user_to_create_dto = UserMapper.toUserDTO(user_to_create);
    const created_account: UserDTO = await this.gateway.create(user_to_create_dto);
    return { created_account };
  }
}
