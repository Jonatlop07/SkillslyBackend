import { Id } from '@application/common/type/common_types';

export default interface QueryStoryRequestInput {
  story_id: Id;
  viewer_id: Id;
}
