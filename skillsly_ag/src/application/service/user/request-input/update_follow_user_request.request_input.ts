import { Id } from '@application/common/type/common_types'

export default interface UpdateFollowUserRequestRequestInput {
  user_id: Id,
  user_that_requests_id: Id,
  accept: boolean
}
