import StoryModel from '@application/service/story/model/story.model';

export default interface DeleteUserStoryCollectionRequestResponse {
  stories: Array<StoryModel>;
}
