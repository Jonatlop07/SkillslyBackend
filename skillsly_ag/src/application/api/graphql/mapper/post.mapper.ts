import PostModel from '@application/service/post/model/post.model';
import { Post } from '@application/api/graphql/model/post/post';
import {PostContentElementMapper} from '@application/api/graphql/mapper/post_content_element.mapper';

export class PostMapper {
  public static toGraphQLModel(post_model: PostModel): Post {
    const {
      post_id,
      owner_id,
      description,
      created_at,
      updated_at,
      privacy,
      content_element
    } = post_model;
    return {
      id: post_id,
      owner_id,
      description,
      created_at,
      updated_at,
      privacy,
      content_element: content_element.map(PostContentElementMapper.toGraphQLModel)
    };
  }
}