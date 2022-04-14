import { Interactor } from '@core/common/use-case/interactor';
import DeleteUserInputModel from '@core/domain/use-case/input-model/delete_user.input_model';
import DeleteUserOutputModel from '@core/domain/use-case/output-model/delete_user.output_model';

export default interface DeleteUserInteractor extends Interactor<DeleteUserInputModel, DeleteUserOutputModel> {}
