import { Interactor } from '@core/common/use-case/interactor'
import CreateUserAccountInputModel from '@core/domain/use-case/account/input-model/create_user_account.input_model'
import CreateUserAccountOutputModel from '@core/domain/use-case/account/output-model/create_user_account.output_model'

export interface CreateUserAccountInteractor extends Interactor<CreateUserAccountInputModel, CreateUserAccountOutputModel> {}
