import {PostMapper} from '@application/api/graphql/mapper/post.mapper';
import PostModel from '@application/service/post/model/post.model';
import {PostCollection} from '@application/api/graphql/model/post/post_collection';

export class PostCollectionMapper {
  public static toGraphQLModel( posts: Array<PostModel>): PostCollection {
    return {
      posts: posts.map(PostMapper.toGraphQLModel)
    };
  }
}