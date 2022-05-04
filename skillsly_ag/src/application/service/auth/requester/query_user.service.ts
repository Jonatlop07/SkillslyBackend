import Requester from '@application/common/requester/requester'
import AuthQueryUserRequestInput from '@application/service/auth/request-input/query_user.request_input'
import AuthQueryUserRequestResponse from '@application/service/auth/request-response/query_user.request_response'
import { Request } from '@application/common/request/request'
import { Injectable } from '@nestjs/common'
import { AUTH_MS_URL } from '@application/service/auth/url'

@Injectable()
export class AuthQueryUserService implements Requester<AuthQueryUserRequestInput, AuthQueryUserRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: AuthQueryUserRequestInput): Promise<AuthQueryUserRequestResponse> {
    return await this.request.getRequest({
      url: `${AUTH_MS_URL}/user/${input.user_id}`,
      params: {}
    });
  }
}
