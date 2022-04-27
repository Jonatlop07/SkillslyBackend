import Requester from '@application/common/requester/requester'
import DeleteUserRequestInput from '@application/service/auth/request-input/delete_user.request_input'
import DeleteUserRequestResponse from '@application/service/auth/request-response/delete_user.request_response'
import { Request } from '@application/common/request/request'
import { AUTH_MS_URL } from '@application/service/auth/url'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteUserService implements Requester<DeleteUserRequestInput, DeleteUserRequestResponse> {
  constructor(
    private readonly request: Request
  ) {
  }

  public async execute(input: DeleteUserRequestInput): Promise<DeleteUserRequestResponse> {
    const { user_id, password } = input;
    return await this.request.deleteRequest<DeleteUserRequestResponse>({
      url: `${AUTH_MS_URL}/auth/user/${user_id}`,
      params: {
        password
      }
    });
  }
}
