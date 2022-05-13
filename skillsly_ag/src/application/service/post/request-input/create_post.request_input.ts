import {Id, Nullable} from '@application/common/type/common_types';
import {Upload} from 'graphql-upload';

export default interface CreatePostRequestInput {
  owner_id: Id;
  description: Nullable<string>;
  privacy: string;
  content_element: Array<PostContentElement>;
}
interface PostContentElement {
  description: Nullable<string>;
  // media: Upload;
  media_locator: string;
  media_type: string;
}