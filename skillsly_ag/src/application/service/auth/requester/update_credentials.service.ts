import Requester from '@application/common/requester/requester'
import UpdateCredentialsRequestInput from '@application/service/auth/request-input/update_credentials.request_input'
import UpdateCredentialsRequestResponse
  from '@application/service/auth/request-response/update_credentials.request_response'
import { Request } from '@application/common/request/request'
import { AUTH_MS_URL } from '@application/service/auth/url'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateCredentialsService
  implements Requester<UpdateCredentialsRequestInput, UpdateCredentialsRequestResponse> {

  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: UpdateCredentialsRequestInput): Promise<UpdateCredentialsRequestResponse> {
    const { user_id, email, password } = input;
    return await this.request.patchRequest({
      url: `${AUTH_MS_URL}/auth/user/${user_id}`,
      body: {
        email,
        password
      },
      params: {}
    });
  }
}
