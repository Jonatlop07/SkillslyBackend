import { Content } from '@application/common/model/comment/comment_content.model';

export default interface CreateInnerCommentRequestResponse {
  _id: string;
  content: Content;
  created_at: string;
  owner_id: string;
}
