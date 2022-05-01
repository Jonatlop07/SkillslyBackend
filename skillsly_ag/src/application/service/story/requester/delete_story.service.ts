import Requester from '@application/common/requester/requester'
import DeleteStoryRequestInput from '@application/service/story/request-input/delete_story.request_input'
import DeleteStoryRequestResponse from '@application/service/story/request-response/delete_story.request_response'
import { Request } from '@application/common/request/request'
import { STORY_MS_URL } from '@application/service/story/url'
import { Injectable } from '@nestjs/common'
import StoryModel from '@application/service/story/model/story.model'

@Injectable()
export class DeleteStoryService implements Requester<DeleteStoryRequestInput, DeleteStoryRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: DeleteStoryRequestInput): Promise<DeleteStoryRequestResponse> {
    const deleted_story = await this.request.deleteRequest<StoryModel>({
      url: `${STORY_MS_URL}/stories/${input.story_id}`,
      params: {}
    });
    return { deleted_story };
  }
}
