import {Injectable} from '@nestjs/common';
import Requester from '@application/common/requester/requester';
import {Request} from '@application/common/request/request';
import PostModel from '@application/service/post/model/post.model';
import {POST_MS_URL} from '@application/service/post/url';
import QueryPostCollectionRequestInput
  from '@application/service/post/request-input/query_post_collection.request_input';
import QueryPostCollectionRequestResponse
  from '@application/service/post/request-response/query_post_collection.request_response';

@Injectable()
export class QueryPostCollectionService implements Requester<QueryPostCollectionRequestInput, QueryPostCollectionRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: QueryPostCollectionRequestInput): Promise<QueryPostCollectionRequestResponse> {
    const posts = await this.request.getRequest<Array<PostModel>>({
      url: `${POST_MS_URL}/api/v1/posts/${input.owner_id}`,
      params: {}
    });
    return {posts};
  }
}