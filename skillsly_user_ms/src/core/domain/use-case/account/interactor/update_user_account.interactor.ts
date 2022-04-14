import { Interactor } from '@core/common/use-case/interactor'
import UpdateUserAccountInputModel from '@core/domain/use-case/account/input-model/update_user_account.input_model'
import UpdateUserAccountOutputModel from '@core/domain/use-case/account/output-model/update_user_account.output_model'

export interface UpdateUserAccountInteractor extends Interactor<UpdateUserAccountInputModel, UpdateUserAccountOutputModel>{}
