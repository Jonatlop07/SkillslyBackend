import { Injectable } from '@nestjs/common'
import Requester from '@application/common/requester/requester'
import StoryModel from '@application/service/story/model/story.model'
import { STORY_MS_URL } from '@application/service/story/url'
import QueryUserStoryCollectionRequestInput
  from '@application/service/story/request-input/query_user_story_collection.request_input'
import DeleteUserStoryCollectionRequestInput
  from '@application/service/story/request-input/delete_user_story_collection.request_input'
import DeleteUserStoryCollectionRequestResponse
  from '@application/service/story/request-response/delete_user_story_collection.request_response'
import { Request } from '@application/common/request/request'

@Injectable()
export class DeleteUserStoryCollectionService
  implements Requester<QueryUserStoryCollectionRequestInput, DeleteUserStoryCollectionRequestResponse> {

  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: DeleteUserStoryCollectionRequestInput): Promise<DeleteUserStoryCollectionRequestResponse> {
    const stories = await this.request.deleteRequest<Array<StoryModel>>({
      url: `${STORY_MS_URL}/user/${input.owner_id}/stories`,
      params: {}
    });
    return { stories }
  }
}
