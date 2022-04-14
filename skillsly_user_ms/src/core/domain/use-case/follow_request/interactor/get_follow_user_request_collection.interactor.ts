import { Interactor } from '@core/common/use-case/interactor'
import GetFollowUserRequestCollectionInputModel
  from '@core/domain/use-case/follow_request/input-model/get_follow_user_request_collection.input_model'
import GetFollowUserRequestCollectionOutputModel
  from '@core/domain/use-case/follow_request/output-model/get_follow_user_request_collection.output_model'

export interface GetFollowUserRequestCollectionInteractor extends Interactor<GetFollowUserRequestCollectionInputModel, GetFollowUserRequestCollectionOutputModel> {}
