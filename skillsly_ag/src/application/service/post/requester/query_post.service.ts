import Requester from '@application/common/requester/requester';
import {Injectable} from '@nestjs/common';
import QueryPostRequestInput from '@application/service/post/request-input/query_post.request_input';
import QueryPostRequestResponse from '@application/service/post/request-response/query_post.request_response';
import {Request} from '@application/common/request/request';
import {POST_MS_URL} from '@application/service/post/url';
import PostModel from '@application/service/post/model/post.model';

@Injectable()
export class QueryPostService implements Requester<QueryPostRequestInput, QueryPostRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: QueryPostRequestInput): Promise<QueryPostRequestResponse> {
    const query_post = await this.request.getRequest<PostModel>({
      url: `${POST_MS_URL}/api/v1/post/${input.post_id}`,
      params: {}
    });
    return {query_post};
  }
}