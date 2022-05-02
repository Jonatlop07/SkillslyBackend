import { StoryView } from '@application/api/graphql/model/story/story_view';
import StoryViewModel from '@application/service/story/model/story_view.model';

export class StoryViewMapper {
  public static toGraphQLModel(story_view_model: StoryViewModel): StoryView {
    const { story_id, viewer_id, viewed_at } = story_view_model;
    return {
      story_id,
      viewer_id,
      viewed_at
    };
  }
}
