import { Id } from '@application/common/type/common_types';

export default interface QueryPostRequestInput {
  post_id: NonNullable<Id>;
}