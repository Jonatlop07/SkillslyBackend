import {Id, Nullable} from '@application/common/type/common_types';

export default interface CreatePostRequestInput {
  owner_id: Id;
  description: string;
  privacy: string;
  content_element: Array<PostContentElement>;
}
interface PostContentElement {
  content_element_id: Id;
  description: Nullable<string>;
  media_locator: Nullable<string>;
}