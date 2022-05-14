import {ContentElement} from '@application/api/graphql/model/post/post_content_element';
import {PostContentElement} from "@application/api/graphql/model/post/input/content_element";
import {Nullable} from "@application/common/type/common_types";

export default interface UpdatePostRequestInput {
  post_id: string;
  owner_id: string;
  description: Nullable<string>;
  privacy: string;
  content_element: Array<PostContentElement>;
}
