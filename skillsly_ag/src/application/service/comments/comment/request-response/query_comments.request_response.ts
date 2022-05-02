import { CommentModel } from '@application/common/model/comment/comment.model';

export default interface QueryCommentsRequestResponse {
  comments: Array<CommentModel>;
}
