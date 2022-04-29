import { Id } from '@application/common/type/common_types';

export default interface FollowRequestDetailsModel {
  id: Id;
  name: string;
  email: string;
  gender: string;
}
