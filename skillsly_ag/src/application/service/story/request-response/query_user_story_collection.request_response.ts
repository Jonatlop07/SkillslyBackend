import StoryModel from '@application/service/story/model/story.model'

export default interface QueryUserStoryCollectionRequestResponse {
  stories: Array<StoryModel>;
}
