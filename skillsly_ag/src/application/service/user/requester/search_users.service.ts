import { Injectable } from '@nestjs/common'
import { Request } from '@application/common/request/request'
import Requester from '@application/common/requester/requester'
import SearchUsersRequestInput from '@application/service/user/request-input/search_users.request_input'
import SearchUsersRequestResponse from '@application/service/user/request-response/search_users.request_response'
import { USER_MS_URL } from '@application/service/user/url'

@Injectable()
export class SearchUsersService implements Requester<SearchUsersRequestInput, SearchUsersRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: SearchUsersRequestInput): Promise<SearchUsersRequestResponse> {
    return await this.request.getRequest<SearchUsersRequestResponse>({
      url: `${USER_MS_URL}/user`,
      params: input
    });
  }
}
