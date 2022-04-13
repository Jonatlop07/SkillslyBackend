import { Interactor } from '@core/common/use-case/interactor'
import CreateUserInputModel from '@core/domain/use-case/input-model/create_user.input_model'
import CreateUserOutputModel from '@core/domain/use-case/output-model/create_user.output_model'

export default interface CreateUserInteractor extends Interactor<CreateUserInputModel, CreateUserOutputModel> {}
