import Requester from '@application/common/requester/requester';
import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import { COMMENT_MS_URL } from '@application/service/user/url';
import QueryCommentsRequestInput from '../request-input/query_comments.request_input';
import QueryCommentsRequestResponse from '../request-response/query_comments.request_response';

@Injectable()
export class QueryCommentsService
  implements Requester<QueryCommentsRequestInput, QueryCommentsRequestResponse>
{
  constructor(private readonly request: Request) {}

  public async execute(
    input: QueryCommentsRequestInput,
  ): Promise<QueryCommentsRequestResponse> {
    const comments =
      await this.request.getRequest<QueryCommentsRequestResponse>({
        url: `${COMMENT_MS_URL}/comments/${input.post_id}`,
        params: { page: input.page, limit: input.limit },
      });
    return comments;
  }
}
