import Requester from '@application/common/requester/requester';
import QueryStoryRequestInput from '@application/service/story/request-input/query_story.request_input';
import QueryStoryRequestResponse from '@application/service/story/request-response/query_story.request_response';
import { Request } from '@application/common/request/request';
import { Injectable } from '@nestjs/common';
import { STORY_MS_URL } from '@application/service/story/url';
import StoryModel from '@application/service/story/model/story.model';

@Injectable()
export class QueryStoryService implements Requester<QueryStoryRequestInput, QueryStoryRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: QueryStoryRequestInput): Promise<QueryStoryRequestResponse> {
    const { story_id, viewer_id } = input;
    const story = await this.request.getRequest<StoryModel>({
      url: `${STORY_MS_URL}/stories/${story_id}`,
      params: {
        viewer_id
      }
    });
    return { story };
  }
}
