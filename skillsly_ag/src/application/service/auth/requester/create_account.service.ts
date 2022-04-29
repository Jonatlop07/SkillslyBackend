import Requester from '@application/common/requester/requester'
import { CreateAccountRequestInput } from '@application/service/auth/request-input/create_account.request_input'
import CreateAccountRequestResponse from '@application/service/auth/request-response/create_account.request_response'
import { Request } from '@application/common/request/request'
import {  Injectable } from '@nestjs/common'
import { AUTH_MS_URL } from '@application/service/auth/url'

@Injectable()
export class CreateAccountService implements Requester<CreateAccountRequestInput, CreateAccountRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: CreateAccountRequestInput): Promise<CreateAccountRequestResponse> {
   return await this.request.postRequest<CreateAccountRequestResponse>({
        url: `${AUTH_MS_URL}/auth/user`,
        body: { ...input },
        params: {}
      }
    );
  }
}
