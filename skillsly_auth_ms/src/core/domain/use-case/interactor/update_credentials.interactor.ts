import { Interactor } from '@core/common/use-case/interactor';
import UpdateCredentialsInputModel from '@core/domain/use-case/input-model/update_credentials.input_model';
import UpdateCredentialsOutputModel from '@core/domain/use-case/output-model/update_credentials.output_model';

export default interface UpdateCredentialsInteractor extends Interactor<UpdateCredentialsInputModel, UpdateCredentialsOutputModel> {}
