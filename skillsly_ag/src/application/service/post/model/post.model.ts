import { Id, Nullable } from '@application/common/type/common_types';
import PostContentElementModel from '@application/service/post/model/post_content_element.model';

export default interface PostModel {
  post_id: Id;
  owner_id: Id;
  description: Nullable<string>;
  created_at: string;
  updated_at: string;
  content_element: Array<PostContentElementModel>;
  privacy: string;
}

