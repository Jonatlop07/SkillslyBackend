import Requester from '@application/common/requester/requester';
import DeleteAccountRequestInput from '@application/service/user/request-input/delete_account.request_input';
import DeleteAccountRequestResponse from '@application/service/user/request-response/delete_account.request_response';
import { Request } from '@application/common/request/request';
import { USER_MS_URL } from '@application/service/user/url';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeleteAccountService implements Requester<DeleteAccountRequestInput, DeleteAccountRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: DeleteAccountRequestInput): Promise<DeleteAccountRequestResponse> {
    return await this.request.deleteRequest<DeleteAccountRequestResponse>({
      url: `${USER_MS_URL}/user/account/${input.user_id}`,
      params: {}
    });
  }
}
