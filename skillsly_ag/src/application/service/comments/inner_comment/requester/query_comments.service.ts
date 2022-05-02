import Requester from '@application/common/requester/requester';
import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import { COMMENT_MS_URL } from '@application/service/user/url';
import QueryInnerCommentsRequestInput from '../request-input/query_inner_comments.request_input';
import QueryInnerCommentsRequestResponse from '../request-response/query_inner_comments.request_response';

@Injectable()
export class QueryInnerCommentsService
implements
    Requester<
    QueryInnerCommentsRequestInput,
    QueryInnerCommentsRequestResponse
    > {
  constructor(private readonly request: Request) {}

  public async execute(
    input: QueryInnerCommentsRequestInput,
  ): Promise<QueryInnerCommentsRequestResponse> {
    return await this.request.getRequest<QueryInnerCommentsRequestResponse>({
      url: `${COMMENT_MS_URL}/inner-comments/${input.comment_id}`,
      params: { page: input.page, limit: input.limit },
    });
  }
}
