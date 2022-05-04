import Requester from '@application/common/requester/requester'
import RequestResetPasswordRequestInput
  from '@application/service/auth/request-input/request_reset_password.request_input'
import RequestResetPasswordRequestResponse
  from '@application/service/auth/request-response/request_reset_password.request_response'
import { Request } from '@application/common/request/request'
import { AUTH_MS_URL } from '@application/service/auth/url'

export class RequestResetPasswordService implements Requester<RequestResetPasswordRequestInput, RequestResetPasswordRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: RequestResetPasswordRequestInput): Promise<RequestResetPasswordRequestResponse> {
    return await this.request.patchRequest({
      url: `${AUTH_MS_URL}/auth/request-reset-password`,
      body: {
        email: input.email
      },
      params: {}
    })
  }
}
