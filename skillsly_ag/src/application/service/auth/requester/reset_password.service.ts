import Requester from '@application/common/requester/requester';
import ResetPasswordRequestInput from '@application/service/auth/request-input/reset_password.request_input';
import ResetPasswordRequestResponse from '@application/service/auth/request-response/reset_password.request_response';
import { Request } from '@application/common/request/request';
import { AUTH_MS_URL } from '@application/service/auth/url';

export class ResetPasswordService implements Requester<ResetPasswordRequestInput, ResetPasswordRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: ResetPasswordRequestInput): Promise<ResetPasswordRequestResponse> {
    return await this.request.patchRequest({
      url: `${AUTH_MS_URL}/auth/reset-password/${input.reset_password_token}`,
      body: {
        password: input.password
      },
      params: {}
    });
  }
}
