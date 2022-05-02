import { Id } from '@application/common/type/common_types';

export default interface CreateStoryRequestInput {
  owner_id: Id;
  description: string;
  media_locator: string;
}
