import { InnerCommentModel } from '@application/common/model/comment/inner_comment.model';

export default interface QueryInnerCommentsRequestResponse {
  inner_comments: Array<InnerCommentModel>;
}
