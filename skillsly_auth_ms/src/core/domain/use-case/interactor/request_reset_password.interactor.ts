import { Interactor } from '@core/common/use-case/interactor'
import RequestResetPasswordInputModel from '@core/domain/use-case/input-model/request_reset_password.input_model'
import RequestResetPasswordOutputModel from '@core/domain/use-case/output-model/request_reset_password.output_model'

export default interface RequestResetPasswordInteractor extends Interactor<RequestResetPasswordInputModel, RequestResetPasswordOutputModel> {}
