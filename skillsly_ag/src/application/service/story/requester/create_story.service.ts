import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import Requester from '@application/common/requester/requester';
import CreateStoryRequestInput from '@application/service/story/request-input/create_story.request_input';
import CreateStoryRequestResponse from '@application/service/story/request-response/create_story.request_response';
import { STORY_MS_URL } from '@application/service/story/url';
import StoryModel from '@application/service/story/model/story.model';

@Injectable()
export class CreateStoryService implements Requester<CreateStoryRequestInput, CreateStoryRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: CreateStoryRequestInput): Promise<CreateStoryRequestResponse> {
    const { owner_id, description, media_locator } = input;
    const created_story = await this.request.postRequest<StoryModel>({
      url: `${STORY_MS_URL}/stories`,
      body: {
        owner_id,
        description,
        media_locator
      },
      params: {}
    });
    return { created_story };
  }
}
