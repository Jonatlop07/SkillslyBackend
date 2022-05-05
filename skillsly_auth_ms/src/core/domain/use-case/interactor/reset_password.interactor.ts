import { Interactor } from '@core/common/use-case/interactor'
import ResetPasswordInputModel from '@core/domain/use-case/input-model/reset_password.input_model'
import ResetPasswordOutputModel from '@core/domain/use-case/output-model/reset_password.output_model'

export default interface ResetPasswordInteractor extends Interactor<ResetPasswordInputModel, ResetPasswordOutputModel> {}
