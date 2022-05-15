import {Id, Nullable} from '@application/common/type/common_types';
import {ContentElement} from "@application/api/graphql/model/post/post_content_element";

export default interface CreatePostRequestInput {
  owner_id: Id;
  description: Nullable<string>;
  privacy: string;
  content_element: Array<ContentElement>;
}
