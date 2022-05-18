import { InnerCommentModel } from '@application/common/model/comment/inner_comment.model';
import { CommentUserModel } from '@application/common/model/comment_user_data.model';
import { CommentUserMapper } from './comment_user.mapper';

export class InnerCommentMapper {
  public static toGraphQLModel(
    inner_comment: InnerCommentModel,
    owner_data: CommentUserModel,
  ) {
    const { _id, comment_id, owner_id, content, created_at, updated_at } =
      inner_comment;
    const { name, email } = owner_data;
    return {
      _id,
      comment_id,
      owner_id,
      description: content.description,
      media_locator: content.media_locator,
      media_type: content.media_type,
      created_at,
      updated_at,
      owner: CommentUserMapper.toGraphQLModel({ name, email }),
    };
  }
}
