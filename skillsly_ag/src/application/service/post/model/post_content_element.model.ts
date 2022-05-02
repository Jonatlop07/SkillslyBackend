import {Id, Nullable} from '@application/common/type/common_types';

export default interface PostContentElementModel {
  content_element_id: Id;
  description: Nullable<string>;
  media_locator: Nullable<string>;
}