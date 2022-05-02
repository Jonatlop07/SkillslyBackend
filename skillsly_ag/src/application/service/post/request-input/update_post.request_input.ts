import {ContentElement} from '@application/api/graphql/model/post/post_content_element';

export default interface UpdatePostRequestInput {
  post_id: string;
  owner_id: string;
  description: string;
  privacy: string;
  content_element: Array<ContentElement>;
}
