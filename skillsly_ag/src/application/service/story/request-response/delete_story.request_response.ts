import StoryModel from '@application/service/story/model/story.model'

export default interface DeleteStoryRequestResponse {
  deleted_story: StoryModel;
}
