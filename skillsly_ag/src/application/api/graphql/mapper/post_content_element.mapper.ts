import PostContentElementModel from '@application/service/post/model/post_content_element.model';
import { ContentElement } from '@application/api/graphql/model/post/post_content_element';

export class PostContentElementMapper {
  public static toGraphQLModel(post_content_element_model: PostContentElementModel): ContentElement {
    const { description, media_locator, media_type } = post_content_element_model;
    return {
      description,
      media_locator,
      media_type
    };
  }
}