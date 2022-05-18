import {Id, Nullable} from '@application/common/type/common_types';

export default interface PostContentElementModel {
  description: Nullable<string>;
  media_locator: Nullable<string>;
  media_type: NonNullable<string>;
}