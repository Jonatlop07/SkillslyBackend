import { Interactor } from '@core/common/use-case/interactor'
import UpdateUserInputModel from '@core/domain/use-case/input-model/update_user.input_model'
import UpdateUserOutputModel from '@core/domain/use-case/output-model/update_user.output_model'

export default interface UpdateUserInteractor extends Interactor<UpdateUserInputModel, UpdateUserOutputModel> {}
