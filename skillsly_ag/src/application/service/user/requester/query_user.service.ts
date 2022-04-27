import Requester from '@application/common/requester/requester'
import QueryUserRequestInput from '@application/service/user/request-input/query_user.request_input'
import QueryUserRequestResponse from '@application/service/user/request-response/query_user.request_response'
import { Injectable } from '@nestjs/common'
import { Request } from '@application/common/request/request'
import { USER_MS_URL } from '@application/service/user/url'

@Injectable()
export class QueryUserService implements Requester<QueryUserRequestInput, QueryUserRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: QueryUserRequestInput): Promise<QueryUserRequestResponse> {
    return await this.request.getRequest<QueryUserRequestResponse>({
      url: `${USER_MS_URL}/user/account/${input.id}`,
      params: {}
    });
  }
}
