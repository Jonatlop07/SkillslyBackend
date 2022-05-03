import { Id } from '@application/common/type/common_types';

export default interface CreateFollowUserRequestRequestInput {
  user_id: Id;
  user_to_follow_id: Id;
}
