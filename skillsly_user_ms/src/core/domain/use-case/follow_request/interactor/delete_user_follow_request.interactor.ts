import { Interactor } from '@core/common/use-case/interactor'
import DeleteFollowUserRequestInputModel
  from '@core/domain/use-case/follow_request/input-model/delete_follow_user_request.input_model'
import DeleteFollowUserRequestOutputModel
  from '@core/domain/use-case/follow_request/output-model/delete_follow_user_request.output_model'

export interface DeleteFollowUserRequestInteractor extends Interactor<DeleteFollowUserRequestInputModel, DeleteFollowUserRequestOutputModel> {}
