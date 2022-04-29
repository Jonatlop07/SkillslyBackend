import { Id, Nullable } from '@application/common/type/common_types'
import StoryViewModel from '@application/service/story/model/story_view.model'

export default interface StoryModel {
  story_id: Id;
  owner_id: Id;
  content: StoryContent;
  created_at: string;
  views: Array<StoryViewModel>;
}

interface StoryContent {
  description: Nullable<string>;
  media_locator: Nullable<string>;
}
