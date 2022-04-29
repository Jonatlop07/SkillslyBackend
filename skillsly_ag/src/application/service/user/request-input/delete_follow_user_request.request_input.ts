import { Id } from '@application/common/type/common_types'

export default interface DeleteFollowUserRequestRequestInput {
  user_id: Id,
  user_to_follow_id: Id,
  is_follow_request: boolean
}
