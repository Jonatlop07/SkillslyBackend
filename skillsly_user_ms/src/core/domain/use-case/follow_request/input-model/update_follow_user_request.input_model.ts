import { Id } from '@core/common/type/common_types'

export default interface UpdateFollowUserRequestInputModel {
  user_to_follow_id: Id;
  user_that_requests_id: Id;
  accept: boolean;
}
