import { Interactor } from '@core/common/use-case/interactor'
import CreateFollowUserRequestInputModel
  from '@core/domain/use-case/follow_request/input-model/create_follow_user_request.input_model'
import CreateFollowUserRequestOutputModel
  from '@core/domain/use-case/follow_request/output-model/create_follow_user_request.output_model'

export interface CreateFollowUserRequestInteractor extends Interactor<CreateFollowUserRequestInputModel, CreateFollowUserRequestOutputModel> {}
