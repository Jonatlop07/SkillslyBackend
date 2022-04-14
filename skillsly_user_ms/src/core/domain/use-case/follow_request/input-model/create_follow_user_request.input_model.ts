import { Id } from '@core/common/type/common_types'

export default interface CreateFollowUserRequestInputModel {
  user_that_requests_id: Id;
  user_to_follow_id: Id;
}
