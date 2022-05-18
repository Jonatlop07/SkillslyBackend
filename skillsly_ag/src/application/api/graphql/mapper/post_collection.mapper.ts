import {PostMapper} from '@application/api/graphql/mapper/post.mapper';
import PostModel from '@application/service/post/model/post.model';
import {PostCollection} from '@application/api/graphql/model/post/post_collection';
import {UserModel} from '@application/common/model/user.model';
import {UserMapper} from '@application/api/graphql/mapper/user.mapper';

export class PostCollectionMapper {
  public static toGraphQLModel( owner: UserModel, posts: Array<PostModel>): PostCollection {
    return {
      posts: posts.map(PostMapper.toGraphQLModel),
      owner: UserMapper.toGraphQLModel(owner),
    };
  }
}