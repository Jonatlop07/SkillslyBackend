import { Interactor } from '@core/common/use-case/interactor';
import ValidateCredentialsInputModel from '@core/domain/use-case/input-model/validate_credentials.input_model';
import ValidateCredentialsOutputModel from '@core/domain/use-case/output-model/validate_credentials.output_model';

export default interface ValidateCredentialsInteractor extends Interactor<ValidateCredentialsInputModel, ValidateCredentialsOutputModel> {}
