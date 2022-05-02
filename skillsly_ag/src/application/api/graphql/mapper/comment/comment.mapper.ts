import { CommentModel } from '@application/common/model/comment/comment.model';

export class CommentMapper {
  public static toGraphQLModel(comment: CommentModel) {
    const {
      _id,
      owner_id,
      created_at,
      updated_at,
      content,
      inner_comment_count,
      post_id,
    } = comment;
    return {
      _id,
      owner_id,
      post_id,
      description: content.description,
      media_locator: content.media_locator,
      created_at,
      updated_at,
      inner_comment_count,
    };
  }
}
