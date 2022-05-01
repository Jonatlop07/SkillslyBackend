import { Content } from '@application/common/model/comment/comment_content.model';
import { Id } from '@application/common/type/common_types';

export default interface CreateInnerCommentRequestInput {
  comment_id: Id;
  owner_id: Id;
  content: Content;
}
