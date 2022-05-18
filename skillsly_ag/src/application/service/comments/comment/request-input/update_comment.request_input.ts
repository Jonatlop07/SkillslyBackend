import { Id } from '@application/common/type/common_types';

export default interface UpdateCommentRequestInput {
  id: Id;
  description?: string;
  media_locator?: string;
  media_type?: string;
}
