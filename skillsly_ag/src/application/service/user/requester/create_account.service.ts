import Requester from '@application/common/requester/requester';
import CreateAccountRequestResponse from '@application/service/user/request-response/create_account.request_response';
import { Injectable } from '@nestjs/common';
import { Request } from '@application/common/request/request';
import { USER_MS_URL } from '@application/service/user/url';
import CreateAccountRequestInput from '@application/service/user/request-input/create_account.request_input';

@Injectable()
export class CreateAccountService
  implements Requester<CreateAccountRequestInput, CreateAccountRequestResponse>
{
  constructor(private readonly request: Request) {}

  public async execute(
    input: CreateAccountRequestInput,
  ): Promise<CreateAccountRequestResponse> {
    return await this.request.postRequest<CreateAccountRequestResponse>({
      url: `${USER_MS_URL}/user/account`,
      body: { ...input },
      params: {},
    });
  }
}
