import Requester from '@application/common/requester/requester';
import QueryFollowRelationshipsRequestInput
  from '@application/service/user/request-input/query_follow_relationships.request_input';
import QueryFollowRelationshipsRequestResponse
  from '@application/service/user/request-response/query_follow_relationships.request_response';
import { Request } from '@application/common/request/request';
import { USER_MS_URL } from '@application/service/user/url';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryFollowRelationshipsService
implements Requester<QueryFollowRelationshipsRequestInput, QueryFollowRelationshipsRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: QueryFollowRelationshipsRequestInput): Promise<QueryFollowRelationshipsRequestResponse> {
    return await this.request.getRequest<QueryFollowRelationshipsRequestResponse>({
      url: `${USER_MS_URL}/user/${input.user_id}/follow`,
      params: {}
    });
  }
}
