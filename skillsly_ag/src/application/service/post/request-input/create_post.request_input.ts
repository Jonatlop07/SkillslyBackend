import {Id, Nullable} from '@application/common/type/common_types';
import {ContentElement} from '@application/api/graphql/model/post/post_content_element';

export default interface CreatePostRequestInput {
  owner_id: NonNullable<Id>;
  description: Nullable<string>;
  privacy: NonNullable<string>;
  content_element: NonNullable<Array<ContentElement>>;
}
