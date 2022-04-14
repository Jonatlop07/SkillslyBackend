import { Interactor } from '@core/common/use-case/interactor'
import UpdateFollowUserRequestInputModel
  from '@core/domain/use-case/follow_request/input-model/update_follow_user_request.input_model'
import UpdateFollowUserRequestOutputModel
  from '@core/domain/use-case/follow_request/output-model/update_follow_user_request.output_model'

export interface UpdateFollowUserRequestInteractor extends Interactor<UpdateFollowUserRequestInputModel, UpdateFollowUserRequestOutputModel> {}
