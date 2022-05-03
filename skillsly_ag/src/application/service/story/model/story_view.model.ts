import { Id } from '@application/common/type/common_types';

export default interface StoryViewModel {
  story_id: Id;
  viewer_id: Id;
  viewed_at: string;
}
