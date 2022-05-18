import Requester from '@application/common/requester/requester';
import { Request } from '@application/common/request/request';
import { AUTH_MS_URL } from '@application/service/auth/url';
import { Injectable } from '@nestjs/common';
import UpdateUserRequestInput from '@application/service/auth/request-input/update_user.request_input';
import UpdateUserRequestResponse from '@application/service/auth/request-response/update_user.request_response';

@Injectable()
export class UpdateUserService
implements Requester<UpdateUserRequestInput, UpdateUserRequestResponse> {

  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: UpdateUserRequestInput): Promise<UpdateUserRequestResponse> {
    const {
      user_id,
      access_token,
      two_factor_auth_secret,
      is_two_factor_auth_enabled,
      reset_password_token
    } = input;
    return await this.request.patchRequest<UpdateUserRequestResponse>({
      url: `${AUTH_MS_URL}/auth/user/${user_id}`,
      body: {
        access_token,
        two_factor_auth_secret,
        is_two_factor_auth_enabled,
        reset_password_token
      },
      params: {}
    });
  }
}
