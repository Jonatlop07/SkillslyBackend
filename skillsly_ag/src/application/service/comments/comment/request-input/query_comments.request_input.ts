import { Id } from '@application/common/type/common_types';

export default interface QueryCommentsRequestInput {
  post_id: Id;
  limit?: number;
  page?: number;
}
