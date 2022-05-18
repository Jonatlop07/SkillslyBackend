import { CommentUserModel } from '@application/common/model/comment_user_data.model';
import { CommentUser } from '../../model/comment/comment_user';

export class CommentUserMapper {
  public static toGraphQLModel(user: CommentUserModel): CommentUser {
    const { email, name } = user;
    return {
      email,
      name,
    };
  }
}
