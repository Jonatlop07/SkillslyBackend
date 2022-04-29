import Requester from '@application/common/requester/requester'
import UpdateAccountRequestInput from '@application/service/user/request-input/update_account.request_input'
import UpdateAccountRequestResponse from '@application/service/user/request-response/update_account.request_response'
import { Request } from '@application/common/request/request'
import { USER_MS_URL } from '@application/service/user/url'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateAccountService implements Requester<UpdateAccountRequestInput, UpdateAccountRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: UpdateAccountRequestInput): Promise<UpdateAccountRequestResponse> {
    const {
      user_id,
      email,
      name,
      date_of_birth,
      gender
    } = input;
    return await this.request.patchRequest<UpdateAccountRequestResponse>({
      url: `${USER_MS_URL}/user/account/${user_id}`,
      body: {
        email,
        name,
        date_of_birth,
        gender
      },
      params: {}
    });
  }
}
