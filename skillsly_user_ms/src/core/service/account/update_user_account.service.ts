import { Inject, Logger } from '@nestjs/common'
import UpdateUserAccountInputModel from '@core/domain/use-case/account/input-model/update_user_account.input_model'
import UpdateUserAccountGateway from '@core/domain/use-case/account/gateway/update_user_account.gateway'
import {
  UserAccountAlreadyExistsException,
  UserAccountInvalidDataFormatException
} from '@core/domain/use-case/common/exception/user_account.exception'
import UpdateUserAccountOutputModel from '@core/domain/use-case/account/output-model/update_user_account.output_model'
import { UserDITokens } from '@core/domain/di/user_di_tokens'
import { UpdateUserAccountInteractor } from '@core/domain/use-case/account/interactor/update_user_account.interactor'
import { User } from '@core/domain/entity/user'
import { PartialUserUpdateDTO } from '@core/domain/use-case/account/persistence/partial_user_update.dto'
import { Id } from '@core/common/type/common_types'

export class UpdateUserAccountService implements UpdateUserAccountInteractor {
  private readonly logger: Logger = new Logger(UpdateUserAccountService.name);

  constructor(
    @Inject(UserDITokens.UserRepository)
    private readonly gateway: UpdateUserAccountGateway
  ) {
  }

  public async execute(input: UpdateUserAccountInputModel): Promise<UpdateUserAccountOutputModel> {
    const { id, updates } = input;
    await this.checkForValidUpdateDataFormat(id, updates);
    await this.checkForEmailUpdate(id, updates);
    return {
      updated_account: await this.gateway.partialUpdate({ id }, updates)
    };
  }

  private async checkForValidUpdateDataFormat(user_id: Id, updates: PartialUserUpdateDTO) {
    const user_to_update = new User({
      ...await this.gateway.findOne({ id: user_id }),
      ...updates
    });
    const is_a_valid_update = user_to_update.hasValidEmail()
      && user_to_update.hasValidName()
      && user_to_update.hasValidDateOfBirth()
      && user_to_update.hasValidGender();
    if (!is_a_valid_update)
      throw new UserAccountInvalidDataFormatException();
  }

  private async checkForEmailUpdate(user_id: Id, updates: PartialUserUpdateDTO) {
    if (updates.email) {
      const existing_user_with_email = await this.gateway.findOne({ email: updates.email });
      if (existing_user_with_email && existing_user_with_email.id !== user_id)
        throw new UserAccountAlreadyExistsException();
    }
  }
}
