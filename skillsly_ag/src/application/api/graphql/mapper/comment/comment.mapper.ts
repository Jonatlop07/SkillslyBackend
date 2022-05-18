import { CommentModel } from '@application/common/model/comment/comment.model';
import { CommentUserModel } from '@application/common/model/comment_user_data.model';
import { CommentUserMapper } from './comment_user.mapper';

export class CommentMapper {
  public static toGraphQLModel(
    comment: CommentModel,
    owner_data: CommentUserModel,
  ) {
    const {
      _id,
      owner_id,
      created_at,
      updated_at,
      content,
      inner_comment_count,
      post_id,
    } = comment;
    const { name, email } = owner_data;
    return {
      _id,
      owner_id,
      post_id,
      description: content.description,
      media_locator: content.media_locator,
      media_type: content.media_type,
      created_at,
      updated_at,
      inner_comment_count,
      owner: CommentUserMapper.toGraphQLModel({ name, email }),
    };
  }
}
