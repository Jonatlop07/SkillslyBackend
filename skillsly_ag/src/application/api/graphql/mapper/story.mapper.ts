import StoryModel from '@application/service/story/model/story.model'
import { Story } from '@application/api/graphql/model/story/story'
import { StoryViewMapper } from '@application/api/graphql/mapper/story_view.mapper'

export class StoryMapper {
  public static toGraphQLModel(story_model: StoryModel): Story {
    const {
      story_id,
      owner_id,
      content,
      created_at,
      views
    } = story_model;
    return {
      id: story_id,
      owner_id,
      description: content.description,
      media_locator: content.media_locator,
      created_at,
      views: views.map(StoryViewMapper.toGraphQLModel)
    }
  }
}
