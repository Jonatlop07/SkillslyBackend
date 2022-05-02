import { Id } from '@application/common/type/common_types';

export default interface QueryInnerCommentsRequestInput {
  comment_id: Id;
  limit?: number;
  page?: number;
}
