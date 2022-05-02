import { InnerCommentModel } from '@application/common/model/comment/inner_comment.model';

export class InnerCommentMapper {
  public static toGraphQLModel(inner_comment: InnerCommentModel) {
    const { _id, comment_id, owner_id, content, created_at, updated_at } =
      inner_comment;
    return {
      _id,
      comment_id,
      owner_id,
      description: content.description,
      media_locator: content.media_locator,
      created_at,
      updated_at,
    };
  }
}
