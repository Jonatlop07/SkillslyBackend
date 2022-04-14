import Exists from '@core/common/persistence/exists'
import UserQueryModel from '@core/domain/use-case/common/query-model/user.query_model'
import GetFollowUserRequestCollection
  from '@core/domain/use-case/follow_request/persistence/get_follow_user_request_collection'

export default interface GetFollowUserRequestCollectionGateway
  extends GetFollowUserRequestCollection, Exists<UserQueryModel> {}
