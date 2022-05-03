import Requester from '@application/common/requester/requester';
import QueryUserStoryCollectionRequestInput
  from '@application/service/story/request-input/query_user_story_collection.request_input';
import QueryUserStoryCollectionRequestResponse
  from '@application/service/story/request-response/query_user_story_collection.request_response';
import { Request } from '@application/common/request/request';
import { Injectable } from '@nestjs/common';
import { STORY_MS_URL } from '@application/service/story/url';
import StoryModel from '@application/service/story/model/story.model';

@Injectable()
export class QueryUserStoryCollectionService
implements Requester<QueryUserStoryCollectionRequestInput, QueryUserStoryCollectionRequestResponse> {

  constructor(
    private readonly request: Request
  ) {
  }


  public async execute(input: QueryUserStoryCollectionRequestInput): Promise<QueryUserStoryCollectionRequestResponse> {
    const stories = await this.request.getRequest<Array<StoryModel>>({
      url: `${STORY_MS_URL}/user/${input.owner_id}/stories`,
      params: {}
    });
    return { stories };
  }
}
