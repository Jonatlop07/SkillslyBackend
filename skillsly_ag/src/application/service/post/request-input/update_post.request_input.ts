import {ContentElement} from '@application/api/graphql/model/post/post_content_element';
import {Nullable} from '@application/common/type/common_types';

export default interface UpdatePostRequestInput {
  post_id: NonNullable<string>;
  owner_id: NonNullable<string>;
  description: Nullable<string>;
  privacy: NonNullable<string>;
  content_element: NonNullable<Array<ContentElement>>;
}
