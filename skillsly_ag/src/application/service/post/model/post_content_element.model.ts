import {Id, Nullable} from '@application/common/type/common_types';

export default interface PostContentElementModel {
  description: Nullable<string>;
  media_locator: string;
  media_type: string;
}